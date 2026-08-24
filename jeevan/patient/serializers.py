from rest_framework import serializers
from .models import Patient
from care.models import CustomUser


class PatientSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)
    contact_number = serializers.CharField(source='user.contact_number', read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'full_name', 'email', 'contact_number', 'gender', 'date_of_birth', 
                 'address', 'city', 'pincode', 'abha_id', 'emergency_number', 
                 'blood_group', 'existing_condition', 'allergies']
        read_only_fields = ['id', 'abha_id']


class PatientRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    contact_number = serializers.CharField()
    password = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True)
    
    class Meta:
        model = Patient
        fields = ['full_name', 'email', 'contact_number', 'password', 'confirm_password']
    
    def validate_email(self, value):
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value
    
    def validate_contact_number(self, value):
        if CustomUser.objects.filter(contact_number=value).exists():
            raise serializers.ValidationError("A user with this contact number already exists.")
        return value
    
    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError("Passwords don't match.")
        return attrs
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        validated_data.pop('confirm_password')
        email = validated_data.pop('email')
        contact_number = validated_data.pop('contact_number')
        
        # Create user
        user, created = CustomUser.objects.get_or_create(
            username=email,
            defaults={
                'email': email,
                'contact_number': contact_number,
                'full_name': validated_data['full_name'],
                'role': 'patient'
            }
        )
        if created:
            user.set_password(password)
            user.save()
        
        # Create patient
        validated_data['user'] = user
        return Patient.objects.create(**validated_data)


class PatientLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        from django.contrib.auth import authenticate
        try:
            user = CustomUser.objects.get(email=email)
            authenticated_user = authenticate(username=user.username, password=password)
            if not authenticated_user:
                raise serializers.ValidationError("Invalid email or password.")
            patient = Patient.objects.get(user=user)
            attrs['patient'] = patient
        except (CustomUser.DoesNotExist, Patient.DoesNotExist):
            raise serializers.ValidationError("Invalid email or password.")
        
        return attrs

