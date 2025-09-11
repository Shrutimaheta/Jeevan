from django.urls import path
from . import views

app_name = "abha"

urlpatterns = [
    path("", views.index, name="index"),   # replace "index" with your real view
]
