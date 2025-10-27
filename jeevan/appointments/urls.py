from django.urls import path
from . import views, abha_views

app_name = "appointments"

urlpatterns = [
    path("", views.appointment_list, name="appointment_list"),
    path("create/", views.appointment_create, name="appointment_create"),
    path("update/<int:appointment_id>/", views.appointment_update, name="appointment_update"),
    path("cancel/<int:appointment_id>/", views.appointment_cancel, name="appointment_cancel"),
    path("detail/<int:appointment_id>/", views.appointment_detail, name="appointment_detail"),
    path("get-doctors/", views.get_doctors, name="get_doctors"),
    path("doctor-selection/<int:hospital_id>/", views.doctor_selection, name="doctor_selection"),
    
    # ABHA ID related endpoints
    path("abha/send-otp/", abha_views.send_abha_otp, name="send_abha_otp"),
    path("abha/verify-otp/", abha_views.verify_abha_otp, name="verify_abha_otp"),
    path("abha/create/", abha_views.create_abha_id, name="create_abha_id"),
    path("abha/status/", abha_views.check_abha_status, name="check_abha_status"),
    path("abha/info/", abha_views.get_abha_info, name="get_abha_info"),
]
