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

    path('receptionist/', include('receptionist.urls')),
    path('doctor/', include('doctor.urls')),
    path('patient/', include('patient.urls')),
    path('appointments/', include('appointments.urls')),
    path('records/', include('records.urls')),
    path('abha/', include('abha.urls')),

    path('test/', views.test, name='test'),  # test page
    path('debug/', views.debug, name='debug'),  # debug page
    path('simple-test/', views.simple_test, name='simple_test'),  # simple test page
    path('patient-home/', views.patient_home, name='patient_home'),
    path('vaidya-login/', views.vaidya_login, name='vaidya_login'),
    # Catch-all route for React app - must be last
    re_path(r'^.*$', views.index, name='index'),
]

# Serve static and media files during development
if settings.DEBUG:
    urlpatterns = [
        path('admin/', admin.site.urls),

        path('receptionist/', include('receptionist.urls')),
        path('doctor/', include('doctor.urls')),
        path('patient/', include('patient.urls')),
        path('appointments/', include('appointments.urls')),
        path('records/', include('records.urls')),
        path('abha/', include('abha.urls')),

        path('test/', views.test, name='test'),  # test page
        path('debug/', views.debug, name='debug'),  # debug page
    path('simple-test/', views.simple_test, name='simple_test'),  # simple test page
        path('react-debug/', views.react_debug, name='react_debug'),  # react debug page
    path('patient-home/', views.patient_home, name='patient_home'),
    path('vaidya-login/', views.vaidya_login, name='vaidya_login'),
    ] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + \
    static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
        # Catch-all route for React app - must be last
        re_path(r'^.*$', views.index, name='index'),
    ]
