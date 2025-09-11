from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ReceptionistViewSet
from .import views

router = DefaultRouter()
router.register(r'receptionists', ReceptionistViewSet, basename='receptionist')

urlpatterns = router.urls

# URLs are correct, no changes needed.
