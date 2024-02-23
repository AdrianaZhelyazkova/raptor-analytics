from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MachineViewSet, UserViewSet, EventViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'machines', MachineViewSet)
router.register(r'events', EventViewSet)