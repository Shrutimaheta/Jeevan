from django.urls import path
from .views import some_view, NURSESIGNUP, nurse_list_api

urlpatterns = [
    path('', some_view, name='some_view'),
    path('nursesignup/', NURSESIGNUP, name='nursesignup'),
    path('api/nurses/', nurse_list_api, name='nurse_list_api'),
]

# URLs are correct, no changes needed.
