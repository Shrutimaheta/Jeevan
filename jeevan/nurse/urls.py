from django.urls import path
from . import views

app_name = "nurse"

urlpatterns = [
    path("", views.nurse_dashboard, name="dashboard"),
    path("dashboard/", views.nurse_dashboard, name="dashboard"),
    path("patient/<int:patient_id>/", views.patient_detail, name="patient_detail"),
    path("patient/<int:patient_id>/log-vitals/", views.log_vitals, name="log_vitals"),
    path("patient/<int:patient_id>/add-note/", views.add_note, name="add_note"),
    path("note/<int:note_id>/edit/", views.edit_note, name="edit_note"),
    path("list-api/", views.nurse_list_api, name="nurse_list_api"),
]
