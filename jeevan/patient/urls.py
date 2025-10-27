from django.urls import path
from . import views, api_views

app_name = 'patient'

urlpatterns = [
    # Web Views
    path('', views.patient_list, name='patient_list'),
    path('<int:patient_id>/', views.patient_detail, name='patient_detail'),
    path('register/', views.patient_register, name='patient_register'),
    path('login/', views.patient_login, name='patient_login'),
    path('logout/', views.patient_logout, name='patient_logout'),
    path('dashboard/', views.patient_dashboard, name='patient_dashboard'),
    path('welcomePatient/', views.profile_dashboard, name='profile_dashboard'),
    path('profile/', views.patient_profile, name='patient_profile'),
    path('change-password/', views.change_password, name='change_password'),
    
    # API Endpoints
    path('api/dashboard-data/', views.dashboard_data, name='dashboard_data'),
    
    # Health Data APIs
    path('api/vital-signs/', api_views.vital_signs_api, name='vital_signs_api'),
    path('api/vital-signs/add/', api_views.add_vital_sign_api, name='add_vital_sign_api'),
    path('api/wellness-log/', api_views.wellness_log_api, name='wellness_log_api'),
    path('api/wellness-log/add/', api_views.log_wellness_api, name='log_wellness_api'),
    path('api/medications/', api_views.medications_api, name='medications_api'),
    path('api/medication-log/', api_views.log_medication_api, name='log_medication_api'),
    
    # Chart Data APIs
    path('api/health-trends/', api_views.health_trends_api, name='health_trends_api'),
    path('api/vital-signs-chart/', api_views.vital_signs_chart_api, name='vital_signs_chart_api'),
    path('api/medication-adherence/', api_views.medication_adherence_api, name='medication_adherence_api'),
    
    # Notification APIs
    path('api/notifications/', api_views.notifications_api, name='notifications_api'),
    path('api/notifications/mark-read/', api_views.mark_notification_read_api, name='mark_notification_read_api'),
    
    # Document Management
    path('documents/', views.document_list, name='document_list'),
    path('documents/upload/', views.document_upload, name='document_upload'),
    path('documents/<int:document_id>/', views.document_detail, name='document_detail'),
    path('documents/<int:document_id>/delete/', views.document_delete, name='document_delete'),
    path('documents/<int:document_id>/download/', views.document_download, name='document_download'),
    
    # Help & Support
    path('help/', views.help_support, name='help_support'),
    path('help/faq/', views.faq_list, name='faq_list'),
    path('help/tickets/', views.support_tickets, name='support_tickets'),
    path('help/tickets/create/', views.create_support_ticket, name='create_support_ticket'),
    path('help/tickets/<int:ticket_id>/', views.support_ticket_detail, name='support_ticket_detail'),
    path('help/resources/', views.health_resources, name='health_resources'),
    path('help/contact/', views.contact_info, name='contact_info'),
    
    # Password Reset
    path('forgot-password/', views.forgot_password, name='forgot_password'),
    path('verify-otp/<int:patient_id>/', views.verify_otp, name='verify_otp'),
    path('verify-email-otp/<int:patient_id>/', views.verify_email_otp, name='verify_email_otp'),
    path('reset-password/<uuid:token>/', views.reset_password, name='reset_password'),
    path('forgot-password-sent/', views.forgot_password_sent, name='forgot_password_sent'),
]
