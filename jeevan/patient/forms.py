from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from .models import Patient, PatientDocument
from care.models import CustomUser
import random
import string


class PatientRegistrationForm(forms.ModelForm):
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Confirm Password'
    }))
    
    class Meta:
        model = Patient
        fields = ['full_name', 'email']
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Full Name'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-control',
                'placeholder': 'Email Address'
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
            # Get content type from the file object
            content_type = getattr(profile_photo, 'content_type', None)
            if not content_type:
                # Fallback: check file extension
                file_name = profile_photo.name.lower()
                if not any(file_name.endswith(ext) for ext in ['.jpg', '.jpeg', '.png', '.gif']):
                    raise ValidationError("Invalid file type. Please upload a JPG, PNG, or GIF image.")
            elif content_type not in allowed_types:
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


class PatientDocumentForm(forms.ModelForm):
    class Meta:
        model = PatientDocument
        fields = ['title', 'document_type', 'file', 'description']
        labels = {
            'title': 'Document Title',
            'document_type': 'Document Type',
            'file': 'Select File',
            'description': 'Description (Optional)'
        }
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter document title'
            }),
            'document_type': forms.Select(attrs={
                'class': 'form-control'
            }),
            'file': forms.FileInput(attrs={
                'class': 'form-control',
                'accept': '.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.bmp,.webp'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Add any additional notes about this document',
                'rows': 3
            }),
        }

    def clean_file(self):
        file = self.cleaned_data.get('file')
        if file:
            # Check file size (10MB max)
            if file.size > 10 * 1024 * 1024:
                raise ValidationError("File too large. Maximum size is 10MB.")
            
            # Check file type
            allowed_extensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']
            file_extension = '.' + file.name.split('.')[-1].lower()
            if file_extension not in allowed_extensions:
                raise ValidationError("Invalid file type. Please upload PDF, DOC, DOCX, or image files.")
        
        return file


class ForgotPasswordForm(forms.Form):
    RECOVERY_METHOD_CHOICES = [
        ('email', 'Email Address'),
        ('phone', 'Phone Number'),
    ]
    
    recovery_method = forms.ChoiceField(
        choices=RECOVERY_METHOD_CHOICES,
        widget=forms.RadioSelect(attrs={
            'class': 'form-check-input'
        }),
        label='Recovery Method'
    )
    
    email = forms.EmailField(
        required=False,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter your email address',
            'id': 'id_email'
        }),
        label='Email Address'
    )
    
    contact_number = forms.CharField(
        required=False,
        max_length=15,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter your phone number',
            'id': 'id_contact_number'
        }),
        label='Phone Number'
    )
    
    def clean(self):
        cleaned_data = super().clean()
        recovery_method = cleaned_data.get('recovery_method')
        email = cleaned_data.get('email')
        contact_number = cleaned_data.get('contact_number')
        
        if recovery_method == 'email':
            if not email:
                raise ValidationError("Please enter your email address.")
            # Check if patient exists with this email
            try:
                patient = Patient.objects.get(email=email)
                cleaned_data['patient'] = patient
            except Patient.DoesNotExist:
                raise ValidationError("No account found with this email address.")
        elif recovery_method == 'phone':
            if not contact_number:
                raise ValidationError("Please enter your phone number.")
            # Check if patient exists with this contact number
            try:
                patient = Patient.objects.get(contact_number=contact_number)
                cleaned_data['patient'] = patient
            except Patient.DoesNotExist:
                raise ValidationError("No account found with this phone number.")
        
        return cleaned_data


class ResetPasswordForm(forms.Form):
    new_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter new password'
        }),
        label='New Password',
        min_length=8,
        help_text='Password must be at least 8 characters long.'
    )
    
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirm new password'
        }),
        label='Confirm New Password'
    )
    
    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get('new_password')
        confirm_password = cleaned_data.get('confirm_password')
        
        if new_password and confirm_password:
            if new_password != confirm_password:
                raise ValidationError("Passwords don't match.")
        
        return cleaned_data
