# # doctor/urls.py
# from django.urls import path
# from .views import DoctorListView

# urlpatterns = [
#     path('doctors/', DoctorListView.as_view(), name='doctor_list'),
# ]

from django.urls import path
from django.shortcuts import render
from django.views.generic import RedirectView
from django.conf import settings
from . import views

app_name = "doctor"

def doctor_test(request):
    return render(request, 'doctor/test.html')

urlpatterns = [
    # Public Profile
    path("<int:doctor_id>/", views.public_doctor_profile, name="public_profile"),

    # Auth
    path("login/", RedirectView.as_view(pattern_name='universal_login', permanent=False), name="login"),
    path("logout/", RedirectView.as_view(pattern_name='universal_logout', permanent=False), name="logout"),
    
    # Dashboard and Profile
    path("", views.doctor_dashboard, name="dashboard"),
    path("dashboard/", views.doctor_dashboard, name="dashboard"),
    path("profile/", views.doctor_profile, name="profile"),
    
    # Appointments
    path("appointments/", views.doctor_appointments, name="appointments"),
    path("appointments/update-status/<int:appointment_id>/<str:status>/", views.update_appointment_status, name="update_appointment_status"),
    path("appointments/get-appointment-info/<int:appointment_id>/", views.get_appointment_info, name="get_appointment_info"),
    path("appointments/<int:appointment_id>/prescription/", views.appointment_prescription, name="appointment_prescription"),
    path("appointments/<int:appointment_id>/prescription/view/", views.view_prescription, name="view_prescription"),
    
    # Patient Management
    path("patients/", views.doctor_patients, name="patients"),
    path("patients/<int:patient_id>/", views.patient_detail, name="patient_detail"),
    path("patients/<int:patient_id>/reports/", views.patient_reports, name="patient_reports"),
    path("patients/<int:patient_id>/request-consent/", views.request_patient_consent, name="request_consent"),
    
    # Consent Management
    path("consent/approve/<int:consent_id>/", views.approve_consent, name="approve_consent"),
    path("consent/reject/<int:consent_id>/", views.reject_consent, name="reject_consent"),
    path("consent/status/<int:doctor_id>/<int:patient_id>/", views.consent_status, name="consent_status"),
    
    # Calendar
    path("calendar/", views.doctor_calendar, name="calendar"),
    
    # API Endpoints
    path("api/appointments/", views.doctor_appointments_api, name="appointments_api"),
    path("api/profile/", views.doctor_profile_api, name="profile_api"),
    path("api/list/", views.doctor_list_api, name="doctor_list_api"),
]

if settings.DEBUG:
    urlpatterns += [
        path("test/", doctor_test, name="test"),
    ]
