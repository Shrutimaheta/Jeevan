from django.urls import path
from . import views

urlpatterns = [
    path('get_user_info/<int:user_id>/', views.get_user_info, name='get_user_info'),
    path('coordinator/dashboard/', views.coordinator_dashboard, name='coordinator_dashboard'),
    path('coordinator/export-zip/', views.export_patient_reports_zip, name='export_patient_reports_zip'),
    path('admin-dashboard/', views.admin_dashboard, name='admin_dashboard'),
]
