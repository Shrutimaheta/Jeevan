from django.urls import path
from . import views

app_name = "appointments"

urlpatterns = [
    path("", views.appointment_list, name="appointment_list"),
    path("create/", views.appointment_create, name="appointment_create"),
    path("update/<int:appointment_id>/", views.appointment_update, name="appointment_update"),
    path("cancel/<int:appointment_id>/", views.appointment_cancel, name="appointment_cancel"),
    path("detail/<int:appointment_id>/", views.appointment_detail, name="appointment_detail"),
    path("get-doctors/", views.get_doctors, name="get_doctors"),
]
