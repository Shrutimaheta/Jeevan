from django.urls import path
from . import views

app_name = "teleconsultation"

urlpatterns = [
    path("<int:teleconsultation_id>/start/", views.start_teleconsultation, name="start"),
    path("<int:teleconsultation_id>/details/", views.get_teleconsultation_details, name="details"),
]
