from django.urls import path, include
from .views import (
    receptionist_login, 
    receptionist_logout,
    receptionist_dashboard,
    receptionist_profile,
    appointment_list,
    appointment_action,
    doctor_schedule_manage,
    receptionist_change_password,
    receptionist_book_appointment,
    receptionist_patient_list,
    receptionist_register_patient,
    receptionist_book_appointment_for_patient,
    doctor_availability
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
    path('doctor-availability/', doctor_availability, name='doctor_availability'),
    path('book-appointment/', receptionist_book_appointment, name='book_appointment'),
    path('patients/', receptionist_patient_list, name='patient_list'),
    path('register-patient/', receptionist_register_patient, name='register_patient'),
    path('book-appointment/<int:patient_id>/', receptionist_book_appointment_for_patient, name='book_appointment_for_patient'),
]
