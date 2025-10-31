from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from django.db import transaction
from .models import Patient, PatientDocument, VitalSign, WellnessLog, Medication, MedicationLog, LabResult, HealthGoal
from care.models import CustomUser
import random
import string


class PatientRegistrationForm(forms.ModelForm):
    confirm_password = forms.CharField(widget=forms.PasswordInput(attrs={
        'class': 'form-control',
        'placeholder': 'Confirm Password'
    }))
    
    username = forms.CharField(max_length=150, widget=forms.TextInput(attrs={
        'class': 'form-control',
        'placeholder': 'Username'
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
                'placeholder': 'Phone Number'
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
        if CustomUser.objects.filter(email=email).exists():
            raise ValidationError("A user with this email already exists.")
        return email

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if CustomUser.objects.filter(username=username).exists():
            raise ValidationError("Username already exists.")
        return username
    
    def clean_contact_number(self):
        contact_number = self.cleaned_data.get('contact_number')
        if contact_number:
            # Check if any user exists with this contact number
            if CustomUser.objects.filter(contact_number=contact_number).exists():
                raise ValidationError("A user with this phone number already exists.")
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
        username = self.cleaned_data.get('username') or self.cleaned_data.get('email')
        email = self.cleaned_data.get('email')
        full_name = self.cleaned_data.get('full_name')
        contact_number = self.cleaned_data.get('contact_number')

        with transaction.atomic():
            user, created = CustomUser.objects.get_or_create(
                username=username,
                defaults={
                    'email': email,
                    'full_name': full_name,
                    'contact_number': contact_number,
                    'role': 'patient'
                }
            )

            # Ensure fields are synced in case of any mismatch
            user.email = email
            user.full_name = full_name
            user.contact_number = contact_number
            user.role = 'patient'
            if created:
                user.set_password(password)
            user.save()

            patient.user = user
            # Store hashed copy if model requires it
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
        fields = ['full_name', 'email', 'contact_number', 'gender', 'dob', 'address', 'city', 'pincode', 'blood_group', 'emergency_number', 'existing_condition', 'allergies', 'profile_photo']
        labels = {
            'full_name': 'Full Name',
            'email': 'Email Address',
            'contact_number': 'Contact Number',
            'gender': 'Gender',
            'dob': 'Date of Birth',
            'address': 'Address',
            'city': 'City',
            'pincode': 'Pincode',
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
    
    # Removed ABHA field and validation
    
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
                'placeholder': 'Enter document title',
                'style': 'font-size: 15px; padding: 0.5rem 0.75rem; height: calc(1.5em + 1rem + 2px);'
            }),
            'document_type': forms.Select(attrs={
                'class': 'form-control',
                'style': 'font-size: 15px; padding: 0.5rem 0.75rem; height: calc(1.5em + 1rem + 2px);'
            }),
            'file': forms.FileInput(attrs={
                'class': 'form-control',
                'accept': '.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.bmp,.webp',
                'style': 'font-size: 15px; padding: 0.5rem 0.75rem;'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': 'Add any additional notes about this document',
                'rows': 4,
                'style': 'font-size: 15px; padding: 0.5rem 0.75rem; min-height: 80px; resize: vertical;'
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


# Health Tracking Forms

class VitalSignForm(forms.ModelForm):
    class Meta:
        model = VitalSign
        fields = ['blood_pressure_systolic', 'blood_pressure_diastolic', 'heart_rate', 'temperature', 'oxygen_saturation', 'weight', 'notes']
        labels = {
            'blood_pressure_systolic': 'Systolic Blood Pressure (mmHg)',
            'blood_pressure_diastolic': 'Diastolic Blood Pressure (mmHg)',
            'heart_rate': 'Heart Rate (BPM)',
            'temperature': 'Temperature (°F)',
            'oxygen_saturation': 'Oxygen Saturation (%)',
            'weight': 'Weight (lbs)',
            'notes': 'Notes'
        }
        widgets = {
            'blood_pressure_systolic': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '50',
                'max': '300',
                'placeholder': 'e.g., 120'
            }),
            'blood_pressure_diastolic': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '30',
                'max': '200',
                'placeholder': 'e.g., 80'
            }),
            'heart_rate': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '30',
                'max': '220',
                'placeholder': 'e.g., 72'
            }),
            'temperature': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '90',
                'max': '110',
                'step': '0.1',
                'placeholder': 'e.g., 98.6'
            }),
            'oxygen_saturation': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '70',
                'max': '100',
                'placeholder': 'e.g., 98'
            }),
            'weight': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '50',
                'max': '500',
                'step': '0.1',
                'placeholder': 'e.g., 150.5'
            }),
            'notes': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Any additional notes about your vital signs'
            })
        }
    
    def clean_blood_pressure_systolic(self):
        value = self.cleaned_data.get('blood_pressure_systolic')
        if value and (value < 50 or value > 300):
            raise ValidationError("Systolic blood pressure must be between 50 and 300 mmHg.")
        return value
    
    def clean_blood_pressure_diastolic(self):
        value = self.cleaned_data.get('blood_pressure_diastolic')
        if value and (value < 30 or value > 200):
            raise ValidationError("Diastolic blood pressure must be between 30 and 200 mmHg.")
        return value
    
    def clean_heart_rate(self):
        value = self.cleaned_data.get('heart_rate')
        if value and (value < 30 or value > 220):
            raise ValidationError("Heart rate must be between 30 and 220 BPM.")
        return value
    
    def clean_temperature(self):
        value = self.cleaned_data.get('temperature')
        if value and (value < 90 or value > 110):
            raise ValidationError("Temperature must be between 90 and 110°F.")
        return value
    
    def clean_oxygen_saturation(self):
        value = self.cleaned_data.get('oxygen_saturation')
        if value and (value < 70 or value > 100):
            raise ValidationError("Oxygen saturation must be between 70 and 100%.")
        return value


class WellnessLogForm(forms.ModelForm):
    class Meta:
        model = WellnessLog
        fields = ['water_intake_glasses', 'sleep_hours', 'steps_count', 'mood_score', 'exercise_minutes', 'stress_level', 'notes']
        labels = {
            'water_intake_glasses': 'Water Intake (glasses)',
            'sleep_hours': 'Sleep Hours',
            'steps_count': 'Steps Count',
            'mood_score': 'Mood (1-5)',
            'exercise_minutes': 'Exercise Minutes',
            'stress_level': 'Stress Level (1-5)',
            'notes': 'Notes'
        }
        widgets = {
            'water_intake_glasses': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'max': '20',
                'placeholder': 'e.g., 8'
            }),
            'sleep_hours': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'max': '24',
                'step': '0.1',
                'placeholder': 'e.g., 7.5'
            }),
            'steps_count': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'max': '100000',
                'placeholder': 'e.g., 10000'
            }),
            'mood_score': forms.Select(attrs={
                'class': 'form-control'
            }),
            'exercise_minutes': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'max': '1440',
                'placeholder': 'e.g., 30'
            }),
            'stress_level': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '1',
                'max': '5',
                'placeholder': '1-5'
            }),
            'notes': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'How are you feeling today?'
            })
        }


class MedicationForm(forms.ModelForm):
    class Meta:
        model = Medication
        fields = ['name', 'dosage', 'frequency', 'prescribed_date', 'prescribed_by', 'instructions', 'side_effects']
        labels = {
            'name': 'Medication Name',
            'dosage': 'Dosage',
            'frequency': 'Frequency',
            'prescribed_date': 'Prescribed Date',
            'prescribed_by': 'Prescribed By',
            'instructions': 'Instructions',
            'side_effects': 'Side Effects'
        }
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., Metformin'
            }),
            'dosage': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., 500mg'
            }),
            'frequency': forms.Select(attrs={
                'class': 'form-control'
            }),
            'prescribed_date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'prescribed_by': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Doctor name'
            }),
            'instructions': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Special instructions for taking this medication'
            }),
            'side_effects': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Any side effects you have experienced'
            })
        }


class MedicationLogForm(forms.ModelForm):
    class Meta:
        model = MedicationLog
        fields = ['notes']
        labels = {
            'notes': 'Notes'
        }
        widgets = {
            'notes': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 2,
                'placeholder': 'Any notes about taking this medication'
            })
        }


class LabResultForm(forms.ModelForm):
    class Meta:
        model = LabResult
        fields = ['test_name', 'test_date', 'result_value', 'normal_range', 'status', 'doctor_notes', 'lab_name', 'file_attachment']
        labels = {
            'test_name': 'Test Name',
            'test_date': 'Test Date',
            'result_value': 'Result Value',
            'normal_range': 'Normal Range',
            'status': 'Status',
            'doctor_notes': 'Doctor Notes',
            'lab_name': 'Laboratory Name',
            'file_attachment': 'File Attachment'
        }
        widgets = {
            'test_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., Blood Glucose'
            }),
            'test_date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'result_value': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., 95 mg/dL'
            }),
            'normal_range': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., 70-100 mg/dL'
            }),
            'status': forms.Select(attrs={
                'class': 'form-control'
            }),
            'doctor_notes': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Doctor interpretation of results'
            }),
            'lab_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Laboratory name'
            }),
            'file_attachment': forms.FileInput(attrs={
                'class': 'form-control',
                'accept': '.pdf,.jpg,.jpeg,.png'
            })
        }


class HealthGoalForm(forms.ModelForm):
    class Meta:
        model = HealthGoal
        fields = ['goal_type', 'title', 'description', 'target_value', 'current_value', 'start_date', 'target_date']
        labels = {
            'goal_type': 'Goal Type',
            'title': 'Goal Title',
            'description': 'Description',
            'target_value': 'Target Value',
            'current_value': 'Current Value',
            'start_date': 'Start Date',
            'target_date': 'Target Date'
        }
        widgets = {
            'goal_type': forms.Select(attrs={
                'class': 'form-control'
            }),
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., Lose 10 pounds'
            }),
            'description': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Detailed description of your goal'
            }),
            'target_value': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., 10 pounds'
            }),
            'current_value': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., 5 pounds'
            }),
            'start_date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            }),
            'target_date': forms.DateInput(attrs={
                'class': 'form-control',
                'type': 'date'
            })
        }
    
    def clean(self):
        cleaned_data = super().clean()
        start_date = cleaned_data.get('start_date')
        target_date = cleaned_data.get('target_date')
        
        if start_date and target_date and start_date >= target_date:
            raise ValidationError("Target date must be after start date.")
        
        return cleaned_data
