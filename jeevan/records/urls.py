from django.urls import path
from . import views

app_name = "records"

urlpatterns = [
    path("patient/<int:patient_id>/", views.record_list, name="record_list"),
    path("<int:record_id>/", views.record_detail, name="record_detail"),
    path("create/<int:appointment_id>/", views.create_record, name="create_record"),
    path("<int:record_id>/download/", views.download_record_file, name="download_file"),
]
