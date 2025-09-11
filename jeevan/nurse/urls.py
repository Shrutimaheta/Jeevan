from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NurseViewSet, some_view, NURSESIGNUP

router = DefaultRouter()
router.register(r'nurses', NurseViewSet, basename='nurse')

urlpatterns = [
    path('', some_view, name='some_view'),
    path('nursesignup/', NURSESIGNUP, name='nursesignup'),
] + router.urls

# URLs are correct, no changes needed.
