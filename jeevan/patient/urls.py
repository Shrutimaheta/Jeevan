from django.urls import path
from . import views

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
    path('api/', views.patient_api_list, name='patient_api_list'),
    path('api/register/', views.api_register, name='api_register'),
    path('api/login/', views.api_login, name='api_login'),
    path('api/profile/', views.api_profile, name='api_profile'),
    path('api/profile/update/', views.api_update_profile, name='api_update_profile'),
    path('api/patients/', views.api_patients, name='api_patients'),
    path('api/dashboard-data/', views.dashboard_data, name='dashboard_data'),
    
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
    path('reset-password/<uuid:token>/', views.reset_password, name='reset_password'),
    path('forgot-password-sent/', views.forgot_password_sent, name='forgot_password_sent'),
]
