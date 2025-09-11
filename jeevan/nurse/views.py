from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import viewsets
from .models import Nurse
from .serializers import NurseSerializer

def some_view(request):
    return HttpResponse("Doctor app working.")

def NURSESIGNUP(request):
    # Ensure you have: templates/nurse/nurse_login.html
    return render(request, 'nurse/nurse_login.html')

class NurseViewSet(viewsets.ModelViewSet):
    queryset = Nurse.objects.all()
    serializer_class = NurseSerializer
