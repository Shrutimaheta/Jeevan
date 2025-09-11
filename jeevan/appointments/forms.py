from django import forms
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime, time
from .models import Appointment
from care.models import Hospital
from doctor.models import Doctor
from patient.models import Patient

User = get_user_model()

class AppointmentForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ['abha_id', 'hospital', 'doctor', 'appointment_date', 'appointment_time', 'symptoms', 'payment_mode']
        widgets = {
            'appointment_date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control',
                'min': 'today'
            }),
            'appointment_time': forms.TimeInput(attrs={
                'type': 'time',
                'class': 'form-control'
            }),
            'symptoms': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Describe your symptoms or reason for appointment...'
            }),
            'hospital': forms.Select(attrs={
                'class': 'form-select',
                'id': 'hospital-select'
            }),
            'doctor': forms.Select(attrs={
                'class': 'form-select',
                'id': 'doctor-select',
                'disabled': True
            }),
            'payment_mode': forms.Select(attrs={
                'class': 'form-select'
            }),
            'abha_id': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your ABHA ID'
            })
        }
        labels = {
            'abha_id': 'ABHA ID',
            'hospital': 'Select Hospital',
            'doctor': 'Select Doctor',
            'appointment_date': 'Appointment Date',
            'appointment_time': 'Appointment Time',
            'symptoms': 'Symptoms / Reason for Visit',
            'payment_mode': 'Payment Mode'
        }

    def __init__(self, *args, **kwargs):
        self.patient = kwargs.pop('patient', None)
        super().__init__(*args, **kwargs)
        
        # Set initial hospital and doctor choices
        self.fields['hospital'].queryset = Hospital.objects.all()
        self.fields['doctor'].queryset = Doctor.objects.none()
        
        # If form is being submitted with data, populate doctor choices based on hospital
        if self.data and 'hospital' in self.data:
            hospital_id = self.data.get('hospital')
            if hospital_id:
                self.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=hospital_id)
                self.fields['doctor'].widget.attrs['disabled'] = False
        
        # Add help text
        self.fields['hospital'].help_text = "Select a hospital to see available doctors"
        self.fields['doctor'].help_text = "Select a doctor from the chosen hospital"

    def clean(self):
        cleaned_data = super().clean()
        appointment_date = cleaned_data.get('appointment_date')
        appointment_time = cleaned_data.get('appointment_time')
        hospital = cleaned_data.get('hospital')
        doctor = cleaned_data.get('doctor')
        
        # Check if appointment date is in the past
        if appointment_date and appointment_date < timezone.now().date():
            raise forms.ValidationError("Appointment date cannot be in the past.")
        
        # Check if appointment is today and time is in the past
        if appointment_date and appointment_time:
            today = timezone.now().date()
            current_time = timezone.now().time()
            
            if appointment_date == today and appointment_time < current_time:
                raise forms.ValidationError("Appointment time cannot be in the past for today's date.")
            
            # Check if appointment time is within business hours (8 AM to 6 PM)
            business_start = time(8, 0)  # 8:00 AM
            business_end = time(18, 0)   # 6:00 PM
            
            if appointment_time < business_start or appointment_time > business_end:
                raise forms.ValidationError("Appointment time must be between 8:00 AM and 6:00 PM.")
        
        # Validate doctor belongs to selected hospital
        if hospital and doctor:
            if not Doctor.objects.filter(id=doctor.id, hospital=hospital).exists():
                raise forms.ValidationError("Selected doctor does not belong to the selected hospital.")
        
        return cleaned_data

class AppointmentUpdateForm(forms.ModelForm):
    class Meta:
        model = Appointment
        fields = ['appointment_date', 'appointment_time', 'symptoms', 'payment_mode']
        widgets = {
            'appointment_date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control',
                'min': 'today'
            }),
            'appointment_time': forms.TimeInput(attrs={
                'type': 'time',
                'class': 'form-control'
            }),
            'symptoms': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 4,
                'placeholder': 'Describe your symptoms or reason for appointment...'
            }),
            'payment_mode': forms.Select(attrs={
                'class': 'form-select'
            })
        }
        labels = {
            'appointment_date': 'Appointment Date',
            'appointment_time': 'Appointment Time',
            'symptoms': 'Symptoms / Reason for Visit',
            'payment_mode': 'Payment Mode'
        }

    def clean(self):
        cleaned_data = super().clean()
        appointment_date = cleaned_data.get('appointment_date')
        appointment_time = cleaned_data.get('appointment_time')
        
        # Check if appointment date is in the past
        if appointment_date and appointment_date < timezone.now().date():
            raise forms.ValidationError("Appointment date cannot be in the past.")
        
        # Check if appointment is today and time is in the past
        if appointment_date and appointment_time:
            today = timezone.now().date()
            current_time = timezone.now().time()
            
            if appointment_date == today and appointment_time < current_time:
                raise forms.ValidationError("Appointment time cannot be in the past for today's date.")
            
            # Check if appointment time is within business hours (8 AM to 6 PM)
            business_start = time(8, 0)  # 8:00 AM
            business_end = time(18, 0)   # 6:00 PM
            
            if appointment_time < business_start or appointment_time > business_end:
                raise forms.ValidationError("Appointment time must be between 8:00 AM and 6:00 PM.")
        
        return cleaned_data

