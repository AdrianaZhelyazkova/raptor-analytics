from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
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
            return Response({"error': 'Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
        
        
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
    
    @action(detail=True, methods=['post'])
    def add_event(self, request, pk=None):
        machine = self.get_object()
        event_serializer = EventSerializer(data=request.data)
        if event_serializer.is_valid():
            event = event_serializer.save()
            machine.events.add(event)
            machine_serializer = self.get_serializer(machine)
            return Response(machine_serializer.data, status=201)
        return Response(event_serializer.errors, status=400)
    

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )