from rest_framework import serializers
from .models import Machine, Event

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ['id', 'name', 'os', 'product_type']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'starting_point', 'final_point', 'duration']