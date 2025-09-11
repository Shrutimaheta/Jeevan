from django.urls import path
from . import views

urlpatterns = [
    path('get_user_info/<int:user_id>/', views.get_user_info, name='get_user_info'),
]
