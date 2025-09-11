# # doctor/urls.py
# from django.urls import path
# from .views import DoctorListView

# urlpatterns = [
#     path('doctors/', DoctorListView.as_view(), name='doctor_list'),
# ]

from django.urls import path
from . import views

app_name = "doctor"

urlpatterns = [
    path("", views.doctor_home, name="doctor_home"),
    path("api/list/", views.DoctorListView.as_view(), name="doctor_list_api"),
]
