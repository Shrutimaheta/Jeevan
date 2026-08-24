"""Root URL configuration for Jeevan."""

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

from doctor import views as doctor_views
from nurse import views as nurse_views
from patient import views as patient_views
from patient import api_views as patient_api_views
from . import views


urlpatterns = [
    path("admin/", admin.site.urls),
    path("login/", views.universal_login, name="universal_login"),
    path("logout/", views.universal_logout, name="universal_logout"),
    path("", views.home, name="home"),
    path("receptionist/", include("receptionist.urls")),
    path("doctor/", include("doctor.urls")),
    path("nurse/", include("nurse.urls")),
    path("patient/", include("patient.urls")),
    path("appointments/", include("appointments.urls")),
    path("", include("care.urls")),
    path("records/", include("records.urls")),
    path("abha/", include("abha.urls")),
    path("teleconsultation/", include("teleconsultation.urls")),
    path("patient-home/", views.patient_home, name="patient_home"),
    path("vaidya-login/", views.vaidya_login, name="vaidya_login"),
    path(
        "hospitals/<int:hospital_id>/doctors/",
        views.hospital_doctors,
        name="hospital_doctors",
    ),
    path(
        "appointments/book/",
        views.redirect_book_to_create,
        name="book_appointment_legacy",
    ),
    path(
        "chat/dialogflow/webhook/",
        views.dialogflow_webhook,
        name="dialogflow_webhook",
    ),
    path("htmx/hospitals/", views.htmx_filter_hospitals, name="htmx_filter_hospitals"),
    path("htmx/doctors/", views.htmx_filter_doctors, name="htmx_filter_doctors"),
    path("emergency/guide/", views.emergency_guide, name="emergency_guide"),
    path(
        "emergency/nearest-hospitals/",
        views.emergency_nearest_hospitals,
        name="emergency_nearest_hospitals",
    ),

    # API Version 1 Namespace Routing
    path(
        "api/v1/",
        include(
            (
                [
                    # OpenAPI Schema View
                    path("schema/", SpectacularAPIView.as_view(), name="schema"),
                    # Interactive OpenAPI UI Docs
                    path("docs/", SpectacularSwaggerView.as_view(url_name="api_v1:schema"), name="swagger-ui"),
                    path("redoc/", SpectacularRedocView.as_view(url_name="api_v1:schema"), name="redoc"),
                    
                    # Doctor APIs
                    path("doctors/appointments/", doctor_views.doctor_appointments_api, name="doctor_appointments_api"),
                    path("doctors/profile/", doctor_views.doctor_profile_api, name="doctor_profile_api"),
                    path("doctors/list/", doctor_views.doctor_list_api, name="doctor_list_api"),
                    
                    # Nurse APIs
                    path("nurses/list/", nurse_views.nurse_list_api, name="nurse_list_api"),
                    
                    # Patient APIs
                    path("patients/dashboard-data/", patient_views.dashboard_data, name="dashboard_data"),
                    path("patients/upload-report/", patient_views.upload_report, name="upload_report"),
                    path("patients/vital-signs/", patient_api_views.vital_signs_api, name="vital_signs_api"),
                    path("patients/vital-signs/add/", patient_api_views.add_vital_sign_api, name="add_vital_sign_api"),
                    path("patients/wellness-log/", patient_api_views.wellness_log_api, name="wellness_log_api"),
                ],
                "api_v1"
            )
        )
    ),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

