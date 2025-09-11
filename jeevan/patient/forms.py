from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from .models import Patient
from care.models import CustomUser


class PatientRegistrationForm(forms.ModelForm):
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Confirm Password'
    }))
    
    class Meta:
        model = Patient
        fields = ['full_name', 'email', 'contact_number']
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Full Name'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Email Address'
            }),
            'contact_number': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Contact Number'
            }),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['password'] = forms.CharField(widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Password'
        }))
        self.fields['confirm_password'] = forms.CharField(widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirm Password'
        }))
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if Patient.objects.filter(email=email).exists():
            raise ValidationError("A patient with this email already exists.")
        return email
    
    def clean_contact_number(self):
        contact_number = self.cleaned_data.get('contact_number')
        if Patient.objects.filter(contact_number=contact_number).exists():
            raise ValidationError("A patient with this contact number already exists.")
        return contact_number
    
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        
        if password and confirm_password:
            if password != confirm_password:
                raise ValidationError("Passwords don't match.")
        
        return cleaned_data
    
    def save(self, commit=True):
        patient = super().save(commit=False)
        password = self.cleaned_data.get('password')
        
        # Create or get user
        username = self.cleaned_data.get('email')
        user, created = CustomUser.objects.get_or_create(
            username=username,
            defaults={
                'email': username,
                'full_name': self.cleaned_data.get('full_name'),
                'role': 'patient'
            }
        )
        if created:
            user.set_password(password)
            user.save()
        
        patient.user = user
        patient.password = make_password(password)
        
        if commit:
            patient.save()
        
        return patient


class PatientLoginForm(forms.Form):
    email = forms.EmailField(widget=forms.EmailInput(attrs={
        'class': 'form-control',
        'placeholder': 'Email Address'
    }))
    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Password'
    }))
    
    def clean(self):
        cleaned_data = super().clean()
        email = cleaned_data.get('email')
        password = cleaned_data.get('password')
        
        if email and password:
            try:
                patient = Patient.objects.get(email=email)
                user = authenticate(username=patient.user.username, password=password)
                if not user:
                    raise ValidationError("Invalid email or password.")
                cleaned_data['patient'] = patient
            except Patient.DoesNotExist:
                raise ValidationError("Invalid email or password.")
        
        return cleaned_data


class PatientProfileForm(forms.ModelForm):
    class Meta:
        model = Patient
        fields = ['full_name', 'email', 'contact_number', 'gender', 'dob', 'address', 'city', 'pincode', 'abha_id', 'blood_group', 'emergency_number', 'existing_condition', 'allergies', 'profile_photo']
        labels = {
            'full_name': 'Full Name',
            'email': 'Email Address',
            'contact_number': 'Contact Number',
            'gender': 'Gender',
            'dob': 'Date of Birth',
            'address': 'Address',
            'city': 'City',
            'pincode': 'Pincode',
            'abha_id': 'ABHA ID',
            'blood_group': 'Blood Group',
            'emergency_number': 'Emergency Contact Number',
            'existing_condition': 'Existing Medical Conditions',
            'allergies': 'Allergies',
            'profile_photo': 'Profile Photo'
        }
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Full Name'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Email Address'
            }),
            'contact_number': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Contact Number'
            }),
            'gender': forms.Select(attrs={
                'class': 'form-control'
            }),
            'dob': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'address': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Address',
                'rows': 3
            }),
            'city': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'City'
            }),
            'pincode': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Pincode'
            }),
            'abha_id': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'ABHA ID (Optional)'
            }),
            'blood_group': forms.Select(attrs={
                'class': 'form-control'
            }),
            'emergency_number': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Emergency Contact Number'
            }),
            'existing_condition': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Existing Medical Conditions',
                'rows': 3
            }),
            'allergies': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Allergies',
                'rows': 3
            }),
            'profile_photo': forms.FileInput(attrs={
                'class': 'form-control',
                'accept': 'image/*'
            }),
        }
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if self.instance and self.instance.pk:
            # If updating existing patient, exclude current patient from uniqueness check
            if Patient.objects.filter(email=email).exclude(pk=self.instance.pk).exists():
                raise ValidationError("A patient with this email already exists.")
        else:
            # If creating new patient
            if Patient.objects.filter(email=email).exists():
                raise ValidationError("A patient with this email already exists.")
        return email
    
    def clean_contact_number(self):
        contact_number = self.cleaned_data.get('contact_number')
        if self.instance and self.instance.pk:
            # If updating existing patient, exclude current patient from uniqueness check
            if Patient.objects.filter(contact_number=contact_number).exclude(pk=self.instance.pk).exists():
                raise ValidationError("A patient with this contact number already exists.")
        else:
            # If creating new patient
            if Patient.objects.filter(contact_number=contact_number).exists():
                raise ValidationError("A patient with this contact number already exists.")
        return contact_number
    
    def clean_abha_id(self):
        abha_id = self.cleaned_data.get('abha_id')
        if abha_id:  # Only validate if ABHA ID is provided
            if self.instance and self.instance.pk:
                # If updating existing patient, exclude current patient from uniqueness check
                if Patient.objects.filter(abha_id=abha_id).exclude(pk=self.instance.pk).exists():
                    raise ValidationError("A patient with this ABHA ID already exists.")
            else:
                # If creating new patient
                if Patient.objects.filter(abha_id=abha_id).exists():
                    raise ValidationError("A patient with this ABHA ID already exists.")
        return abha_id
    
    def clean_profile_photo(self):
        profile_photo = self.cleaned_data.get('profile_photo')
        if profile_photo:
            # Check file size (5MB max)
            if profile_photo.size > 5 * 1024 * 1024:
                raise ValidationError("Image file too large. Maximum size is 5MB.")
            
            # Check file type
            allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
            if profile_photo.content_type not in allowed_types:
                raise ValidationError("Invalid file type. Please upload a JPG, PNG, or GIF image.")
        
        return profile_photo


class ChangePasswordForm(forms.Form):
    current_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Current Password'
        }),
        label='Current Password'
    )
    new_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'New Password'
        }),
        label='New Password',
        min_length=8
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirm New Password'
        }),
        label='Confirm New Password'
    )
    
    def __init__(self, user, *args, **kwargs):
        self.user = user
        super().__init__(*args, **kwargs)
    
    def clean_current_password(self):
        current_password = self.cleaned_data.get('current_password')
        if not self.user.check_password(current_password):
            raise ValidationError("Current password is incorrect.")
        return current_password
    
    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get('new_password')
        confirm_password = cleaned_data.get('confirm_password')
        
        if new_password and confirm_password:
            if new_password != confirm_password:
                raise ValidationError("New passwords don't match.")
        
        return cleaned_data
