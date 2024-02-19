from django.contrib import admin
from .models import Machine, Event

class MachineAdmin(admin.ModelAdmin):
    list_display = ('name', 'os', 'product_type')

class EventAdmin(admin.ModelAdmin):
    list_display = ('name', 'starting_point', 'final_point', 'duration')

admin.site.register(Machine, MachineAdmin)
admin.site.register(Event, EventAdmin)
