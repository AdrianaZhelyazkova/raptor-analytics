from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.db.models import Avg, Q
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Machine, Event
from .serializers import MachineSerializer, EventSerializer, UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
        
        
    @action(detail=False, methods=['post'], authentication_classes=[SessionAuthentication, BasicAuthentication], permission_classes=[AllowAny])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
        
    @action(detail=False, methods=['GET'])
    def current_user(self, request):
        user = request.user
        currentUser = UserSerializer(user)
        return Response({'user':currentUser.data}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({'detail': "Logged out successfully"})
     
    
class MachineViewSet(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    
    @action(detail=False, methods=['GET'])
    def os_options(self, request):
        os_choices = [choice[0] for choice in Machine.OS_CHOICES]
        return JsonResponse(os_choices, safe=False)
    
    @action(detail=False, methods=['GET'])
    def product_type_options(self, request):
        product_type_choices = [choice[0] for choice in Machine.PRODUCT_TYPE_CHOICES]
        return JsonResponse(product_type_choices, safe=False)
    

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
    
    @action(detail=False, methods=['GET'])
    def query_events(self, request):
        event_name = request.query_params.get('event_name', None)
        starting_point = request.query_params.get('starting_point', None)
        final_point = request.query_params.get('final_point', None)
        machine_os = request.query_params.get('machine_os', None)
        product_type = request.query_params.get('product_type', None)

        filters = Q()
        if event_name:
            filters &= Q(name=event_name)
        if starting_point:
            filters &= Q(starting_point=starting_point)
        if final_point:
            filters &= Q(final_point=final_point)
        if machine_os:
            filters &= Q(machine__os=machine_os)
        if product_type:
            filters &= Q(machine__product_type=product_type)

        queried_events = Event.objects.filter(filters)

        if queried_events.exists():
            mean_duration = round(queried_events.aggregate(Avg('duration'))['duration__avg'])
        else:
            mean_duration = None

        serializer = EventSerializer(queried_events, many=True)

        response_data = {
            'queried_events': serializer.data,
            'mean_duration': mean_duration
        }

        return Response(response_data)
    
    @action(detail=False, methods=['GET'])
    def name_options(self, request):
        name_choices = [choice[0] for choice in Event.NAME_CHOICES]
        return JsonResponse(name_choices, safe=False)