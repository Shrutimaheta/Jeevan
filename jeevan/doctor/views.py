# # doctor/views.py
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .models import Doctor
# from .serializers import DoctorSerializer

# class DoctorListView(APIView):
#     def get(self, request):
#         doctors = Doctor.objects.all()
#         serializer = DoctorSerializer(doctors, many=True)
#         return Response(serializer.data)

from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Doctor
from .serializers import DoctorSerializer

def doctor_home(request):
    return HttpResponse("Doctor Home Page")

class DoctorListView(APIView):
    def get(self, request):
        doctors = Doctor.objects.all()
        serializer = DoctorSerializer(doctors, many=True)
        return Response(serializer.data)
