from django.urls import path, include
from .views import (
    receptionist_login, 
    receptionist_logout,
    receptionist_dashboard,
    receptionist_profile,
    appointment_list,
    appointment_action,
    doctor_schedule_manage,
    receptionist_change_password
)

app_name = 'receptionist'

urlpatterns = [
    path('', receptionist_dashboard, name='dashboard'),
    path('dashboard/', receptionist_dashboard, name='dashboard'),
    path('login/', receptionist_login, name='login'),
    path('logout/', receptionist_logout, name='logout'),
    path('profile/', receptionist_profile, name='profile'),
    path('change-password/', receptionist_change_password, name='change_password'),
    path('appointments/', appointment_list, name='appointments'),
    path('appointments/<int:appointment_id>/<str:action>/', appointment_action, name='appointment_action'),
    path('doctor-schedule/', doctor_schedule_manage, name='doctor_schedule'),
]
