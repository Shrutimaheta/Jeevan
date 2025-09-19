# # doctor/urls.py
# from django.urls import path
# from .views import DoctorListView

# urlpatterns = [
#     path('doctors/', DoctorListView.as_view(), name='doctor_list'),
# ]

from django.urls import path
from django.shortcuts import render
from . import views

app_name = "doctor"

def doctor_test(request):
    return render(request, 'doctor/test.html')

urlpatterns = [
    # Test
    path("test/", doctor_test, name="test"),

    # Auth
    path("login/", views.doctor_login, name="login"),
    
    # Dashboard and Profile
    path("", views.doctor_dashboard, name="dashboard"),
    path("dashboard/", views.doctor_dashboard, name="dashboard"),
    path("profile/", views.doctor_profile, name="profile"),
    
    # Appointments
    path("appointments/", views.doctor_appointments, name="appointments"),
    path("appointments/update-status/<int:appointment_id>/", views.update_appointment_status, name="update_appointment_status"),
    path("appointments/<int:appointment_id>/prescription/", views.appointment_prescription, name="appointment_prescription"),
    
    # API Endpoints
    path("api/appointments/", views.doctor_appointments_api, name="appointments_api"),
    path("api/profile/", views.doctor_profile_api, name="profile_api"),
    path("api/list/", views.DoctorListView.as_view(), name="doctor_list_api"),
]
