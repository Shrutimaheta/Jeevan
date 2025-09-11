from rest_framework import serializers
from .models import Patient


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'full_name', 'email', 'contact_number', 'gender', 'dob', 
                 'address', 'city', 'pincode', 'abha_id', 'emergency_number', 
                 'blood_group', 'existing_condition', 'allergies']
        read_only_fields = ['id', 'abha_id']


class PatientRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Patient
        fields = ['full_name', 'email', 'contact_number', 'password', 'confirm_password']
    
    def validate_email(self, value):
        if Patient.objects.filter(email=value).exists():
            raise serializers.ValidationError("A patient with this email already exists.")
        return value
    
    def validate_contact_number(self, value):
        if Patient.objects.filter(contact_number=value).exists():
            raise serializers.ValidationError("A patient with this contact number already exists.")
        return value
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords don't match.")
        return attrs
    
    def create(self, validated_data):
        from care.models import CustomUser
        from django.contrib.auth.hashers import make_password
        
        password = validated_data.pop('password')
        validated_data.pop('confirm_password')
        
        # Create user
        username = validated_data['email']
        user, created = CustomUser.objects.get_or_create(
            username=username,
            defaults={
                'email': username,
                'full_name': validated_data['full_name'],
                'role': 'patient'
            }
        )
        if created:
            user.set_password(password)
            user.save()
        
        # Create patient
        validated_data['user'] = user
        validated_data['password'] = make_password(password)
        return Patient.objects.create(**validated_data)


class PatientLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        try:
            patient = Patient.objects.get(email=email)
            from django.contrib.auth import authenticate
            user = authenticate(username=patient.user.username, password=password)
            if not user:
                raise serializers.ValidationError("Invalid email or password.")
            attrs['patient'] = patient
        except Patient.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")
        
        return attrs
