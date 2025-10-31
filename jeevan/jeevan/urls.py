# from django.contrib import admin
# from django.urls import path, re_path
# from . import views

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     # Catch-all route for React
#     re_path(r'^.*$', views.index, name='index'),
# ]

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Universal authentication - root login
    path('login/', views.universal_login, name='universal_login'),
    path('logout/', views.universal_logout, name='universal_logout'),
    path('', views.home, name='home'),

    path('receptionist/', include('receptionist.urls')),
    path('doctor/', include('doctor.urls')),
    path('patient/', include('patient.urls')),
    path('appointments/', include('appointments.urls')),
    path('records/', include('records.urls')),
    path('abha/', include('abha.urls')),

    path('test/', views.test, name='test'),  # test page
    path('debug/', views.debug, name='debug'),  # debug page
    path('simple-test/', views.simple_test, name='simple_test'),  # simple test page
    path('test-logo/', views.test_logo, name='test_logo'),  # logo test page
    path('patient-home/', views.patient_home, name='patient_home'),
    path('vaidya-login/', views.vaidya_login, name='vaidya_login'),
    path('hospitals/<int:hospital_id>/doctors/', views.hospital_doctors, name='hospital_doctors'),
    # Backward-compat: redirect old /appointments/book/ to /appointments/create/
    path('appointments/book/', views.redirect_book_to_create, name='book_appointment_legacy'),
    path('chat/dialogflow/webhook/', views.dialogflow_webhook, name='dialogflow_webhook'),
    path('htmx/hospitals/', views.htmx_filter_hospitals, name='htmx_filter_hospitals'),
    path('htmx/doctors/', views.htmx_filter_doctors, name='htmx_filter_doctors'),
    path('emergency/guide/', views.emergency_guide, name='emergency_guide'),
    path('emergency/nearest-hospitals/', views.emergency_nearest_hospitals, name='emergency_nearest_hospitals'),
    # Catch-all route for React app - must be last
    re_path(r'^.*$', views.index, name='index'),
]

# Serve static and media files during development
if settings.DEBUG:
    urlpatterns = [
        path('admin/', admin.site.urls),
        
        # Universal authentication - root login
        path('login/', views.universal_login, name='universal_login'),
        path('logout/', views.universal_logout, name='universal_logout'),
        path('', views.home, name='home'),

        path('receptionist/', include('receptionist.urls')),
        path('doctor/', include('doctor.urls')),
        path('patient/', include('patient.urls')),
        path('appointments/', include('appointments.urls')),
        path('records/', include('records.urls')),
        path('abha/', include('abha.urls')),

        path('test/', views.test, name='test'),  # test page
        path('debug/', views.debug, name='debug'),  # debug page
        path('simple-test/', views.simple_test, name='simple_test'),  # simple test page
        path('test-logo/', views.test_logo, name='test_logo'),  # logo test page
        path('react-debug/', views.react_debug, name='react_debug'),  # react debug page
        path('patient-home/', views.patient_home, name='patient_home'),
        path('vaidya-login/', views.vaidya_login, name='vaidya_login'),
        path('hospitals/<int:hospital_id>/doctors/', views.hospital_doctors, name='hospital_doctors'),
        # Backward-compat in DEBUG too
        path('appointments/book/', views.redirect_book_to_create, name='book_appointment_legacy'),
        path('chat/dialogflow/webhook/', views.dialogflow_webhook, name='dialogflow_webhook'),
        path('htmx/hospitals/', views.htmx_filter_hospitals, name='htmx_filter_hospitals'),
        path('htmx/doctors/', views.htmx_filter_doctors, name='htmx_filter_doctors'),
        path('emergency/guide/', views.emergency_guide, name='emergency_guide'),
        path('emergency/nearest-hospitals/', views.emergency_nearest_hospitals, name='emergency_nearest_hospitals'),
    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + \
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
        # Catch-all route for React app - must be last
        re_path(r'^.*$', views.index, name='index'),
    ]
