from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Machine, Event


class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['id', 'username', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
    
        

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'starting_point', 'final_point', 'duration', 'machine']
        

class MachineSerializer(serializers.ModelSerializer):
    events = EventSerializer(many=True, read_only=True)
    
    class Meta:
        model = Machine
        fields = ['id', 'name', 'os', 'product_type', 'events']