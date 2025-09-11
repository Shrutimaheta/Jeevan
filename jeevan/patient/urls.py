from django.urls import path
from . import views

app_name = 'patient'

urlpatterns = [
    # Web Views
    path('', views.patient_list, name='patient_list'),
    path('<int:patient_id>/', views.patient_detail, name='patient_detail'),
    path('register/', views.patient_register, name='patient_register'),
    path('login/', views.patient_login, name='patient_login'),
    path('logout/', views.patient_logout, name='patient_logout'),
    path('dashboard/', views.patient_dashboard, name='patient_dashboard'),
    path('profile/', views.patient_profile, name='patient_profile'),
    path('change-password/', views.change_password, name='change_password'),
    
    # API Endpoints
    path('api/', views.patient_api_list, name='patient_api_list'),
    path('api/register/', views.api_register, name='api_register'),
    path('api/login/', views.api_login, name='api_login'),
    path('api/profile/', views.api_profile, name='api_profile'),
    path('api/profile/update/', views.api_update_profile, name='api_update_profile'),
    path('api/patients/', views.api_patients, name='api_patients'),
]
