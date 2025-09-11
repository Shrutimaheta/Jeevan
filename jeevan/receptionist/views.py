from rest_framework import viewsets
from .models import Receptionist
from .serializers import ReceptionistSerializer
from django.shortcuts import render

class ReceptionistViewSet(viewsets.ModelViewSet):
    queryset = Receptionist.objects.all()
    serializer_class = ReceptionistSerializer


# def RECSIGNUP(request):
#     return render(request,'receptionist/receptionist_login.html')

