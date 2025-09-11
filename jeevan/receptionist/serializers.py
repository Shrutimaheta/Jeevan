# receptionist/serializers.py
from rest_framework import serializers
from .models import Receptionist

class ReceptionistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Receptionist
        fields = "__all__"
        extra_kwargs = {
            "password": {"write_only": True}  # never expose password in API response
        }

# Serializer is correct, no changes needed.
