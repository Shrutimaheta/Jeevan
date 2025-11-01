from django.urls import path
from .views import some_view, NURSESIGNUP, nurse_list_api, nurse_dashboard

app_name = 'nurse'

urlpatterns = [
    path('', nurse_dashboard, name='dashboard'),
    path('dashboard/', nurse_dashboard, name='dashboard'),
    path('nursesignup/', NURSESIGNUP, name='nursesignup'),
    path('api/nurses/', nurse_list_api, name='nurse_list_api'),
]

# URLs are correct, no changes needed.
