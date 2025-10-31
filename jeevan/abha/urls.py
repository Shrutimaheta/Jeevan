from django.urls import path
from . import views

app_name = "abha"

urlpatterns = [
    path("", views.index, name="index"),
    path("create/", views.create_abha_id, name="create_abha_id"),
    path("verify/", views.verify_abha, name="verify_abha"),
    path("check-uniqueness/", views.check_abha_uniqueness, name="check_abha_uniqueness"),
    path("generate-otp/", views.generate_otp, name="generate_otp"),
    path("verify-otp/", views.verify_otp, name="verify_otp"),
]
