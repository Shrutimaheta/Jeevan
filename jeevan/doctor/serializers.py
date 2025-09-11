# doctor/serializers.py
from rest_framework import serializers
from .models import Doctor

class DoctorSerializer(serializers.ModelSerializer):
    specialization = serializers.StringRelatedField(many=True)
    hospital = serializers.StringRelatedField()
    user = serializers.StringRelatedField()

    class Meta:
        model = Doctor
        fields = [
            'id', 'user', 'full_name', 'contact_number', 'hospital',
            'gender', 'specialization'
        ]
# Serializer is correct, no changes needed.