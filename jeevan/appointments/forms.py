from django import forms
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import datetime, time, timedelta
from .models import Appointment
from care.models import Hospital
from doctor.models import Doctor
from patient.models import Patient

User = get_user_model()

class AppointmentForm(forms.ModelForm):
    # Custom time fields
    hour = forms.ChoiceField(
        choices=[(i, f"{i:02d}") for i in range(1, 13)],
        widget=forms.Select(attrs={'class': 'form-select', 'id': 'hour-select'}),
        label='Hour'
    )
    minute = forms.ChoiceField(
        choices=[(i, f"{i:02d}") for i in range(0, 60, 15)],  # 15-minute intervals
        widget=forms.Select(attrs={'class': 'form-select', 'id': 'minute-select'}),
        label='Minute'
    )
    am_pm = forms.ChoiceField(
        choices=[('AM', 'AM'), ('PM', 'PM')],
        widget=forms.Select(attrs={'class': 'form-select', 'id': 'am-pm-select'}),
        label='AM/PM',
        initial='PM'
    )
    
    
    class Meta:
        model = Appointment
        fields = ['abha_id', 'hospital', 'doctor', 'appointment_date', 'appointment_time', 'symptoms', 'payment_mode']
        widgets = {
            'appointment_date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control',
                'id': 'appointment-date'
            }),
            'appointment_time': forms.TimeInput(attrs={
                'type': 'hidden',
                'id': 'appointment-time-hidden'
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
            'symptoms': 'Symptoms / Reason for Visit',
            'payment_mode': 'Payment Mode'
        }

    def __init__(self, *args, **kwargs):
        self.patient = kwargs.pop('patient', None)
        super().__init__(*args, **kwargs)
        
        # Set initial hospital and doctor choices
        self.fields['hospital'].queryset = Hospital.objects.all()
        self.fields['doctor'].queryset = Doctor.objects.none()
        
        # Set date restrictions (today to 6 months)
        today = timezone.now().date()
        max_date = today + timedelta(days=180)  # 6 months
        self.fields['appointment_date'].widget.attrs['min'] = today.strftime('%Y-%m-%d')
        self.fields['appointment_date'].widget.attrs['max'] = max_date.strftime('%Y-%m-%d')
        
        # Set initial time values
        if self.instance and self.instance.appointment_time:
            time_obj = self.instance.appointment_time
            hour_12 = time_obj.hour % 12
            if hour_12 == 0:
                hour_12 = 12
            self.fields['hour'].initial = hour_12
            self.fields['minute'].initial = time_obj.minute
            self.fields['am_pm'].initial = 'AM' if time_obj.hour < 12 else 'PM'
        
        # If form is being submitted with data, populate doctor choices based on hospital
        if self.data and 'hospital' in self.data:
            hospital_id = self.data.get('hospital')
            if hospital_id:
                self.fields['doctor'].queryset = Doctor.objects.filter(hospital_id=hospital_id)
                self.fields['doctor'].widget.attrs['disabled'] = False
        
        # Add help text
        self.fields['hospital'].help_text = "Select a hospital to see available doctors"
        self.fields['doctor'].help_text = "Select a doctor from the chosen hospital"
        self.fields['appointment_date'].help_text = f"Select a date between today and {max_date.strftime('%B %d, %Y')}"

    def clean(self):
        cleaned_data = super().clean()
        appointment_date = cleaned_data.get('appointment_date')
        appointment_time = cleaned_data.get('appointment_time')
        hour = cleaned_data.get('hour')
        minute = cleaned_data.get('minute')
        am_pm = cleaned_data.get('am_pm')
        hospital = cleaned_data.get('hospital')
        doctor = cleaned_data.get('doctor')
        
        # Validate required time fields (temporarily disabled for debugging)
        # if not hour or not minute or not am_pm:
        #     raise forms.ValidationError("Please select hour, minute, and AM/PM for appointment time.")
        
        # Convert custom time fields to 24-hour format
        if hour and minute and am_pm:
            try:
                hour_24 = int(hour)
                minute_int = int(minute)
                
                if am_pm == 'PM' and hour_24 != 12:
                    hour_24 += 12
                elif am_pm == 'AM' and hour_24 == 12:
                    hour_24 = 0
                
                appointment_time = time(hour_24, minute_int)
                cleaned_data['appointment_time'] = appointment_time
            except (ValueError, TypeError):
                raise forms.ValidationError("Invalid time format selected.")
        elif appointment_time:
            # Use the hidden field value if custom fields are not provided
            cleaned_data['appointment_time'] = appointment_time
        else:
            # Fallback to a default time
            cleaned_data['appointment_time'] = time(9, 0)  # 9:00 AM
        
        # Check if appointment date is in the past
        if appointment_date and appointment_date < timezone.now().date():
            raise forms.ValidationError("Appointment date cannot be in the past.")
        
        # Check if appointment date is within 6 months
        if appointment_date:
            today = timezone.now().date()
            max_date = today + timedelta(days=180)
            if appointment_date > max_date:
                raise forms.ValidationError("Appointment date cannot be more than 6 months in the future.")
        
        # Check if appointment is today and time is in the past
        if appointment_date and 'appointment_time' in cleaned_data:
            today = timezone.now().date()
            current_time = timezone.now().time()
            
            if appointment_date == today and cleaned_data['appointment_time'] < current_time:
                raise forms.ValidationError("Appointment time cannot be in the past for today's date.")
            
            # Check if appointment time is within business hours (8 AM to 6 PM)
            business_start = time(8, 0)  # 8:00 AM
            business_end = time(18, 0)   # 6:00 PM
            
            if cleaned_data['appointment_time'] < business_start or cleaned_data['appointment_time'] > business_end:
                raise forms.ValidationError("Appointment time must be between 8:00 AM and 6:00 PM.")
        
        # Validate doctor belongs to selected hospital
        if hospital and doctor:
            if not Doctor.objects.filter(id=doctor.id, hospital=hospital).exists():
                raise forms.ValidationError("Selected doctor does not belong to the selected hospital.")
        
        return cleaned_data

class AppointmentUpdateForm(forms.ModelForm):
    # Custom time fields
    hour = forms.ChoiceField(
        choices=[(i, f"{i:02d}") for i in range(1, 13)],
        widget=forms.Select(attrs={'class': 'form-select', 'id': 'hour-select'}),
        label='Hour'
    )
    minute = forms.ChoiceField(
        choices=[(i, f"{i:02d}") for i in range(0, 60, 15)],  # 15-minute intervals
        widget=forms.Select(attrs={'class': 'form-select', 'id': 'minute-select'}),
        label='Minute'
    )
    am_pm = forms.ChoiceField(
        choices=[('AM', 'AM'), ('PM', 'PM')],
        widget=forms.Select(attrs={'class': 'form-select', 'id': 'am-pm-select'}),
        label='AM/PM'
    )
    
    class Meta:
        model = Appointment
        fields = ['appointment_date', 'appointment_time', 'hour', 'minute', 'am_pm', 'symptoms', 'payment_mode']
        widgets = {
            'appointment_date': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control',
                'id': 'appointment-date'
            }),
            'appointment_time': forms.TimeInput(attrs={
                'type': 'hidden',
                'id': 'appointment-time-hidden'
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

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        today = timezone.now().date()
        max_date = today + timedelta(days=180)  # 6 months from today
        
        # Set min and max attributes for date field
        self.fields['appointment_date'].widget.attrs['min'] = today.strftime('%Y-%m-%d')
        self.fields['appointment_date'].widget.attrs['max'] = max_date.strftime('%Y-%m-%d')
        
        # Pre-populate time fields if appointment exists
        if self.instance and self.instance.pk and self.instance.appointment_time:
            appointment_time = self.instance.appointment_time
            hour_12 = appointment_time.hour
            minute = appointment_time.minute
            am_pm = 'AM'
            
            if hour_12 == 0:
                hour_12 = 12
            elif hour_12 > 12:
                hour_12 -= 12
                am_pm = 'PM'
            elif hour_12 == 12:
                am_pm = 'PM'
            
            print(f"Debug: Converting time {appointment_time} to {hour_12}:{minute} {am_pm}")
            
            self.fields['hour'].initial = hour_12
            self.fields['minute'].initial = minute
            self.fields['am_pm'].initial = am_pm

    def clean(self):
        cleaned_data = super().clean()
        appointment_date = cleaned_data.get('appointment_date')
        appointment_time = cleaned_data.get('appointment_time')
        hour = cleaned_data.get('hour')
        minute = cleaned_data.get('minute')
        am_pm = cleaned_data.get('am_pm')
        
        # Validate required time fields
        if not hour or not minute or not am_pm:
            raise forms.ValidationError("Please select hour, minute, and AM/PM for appointment time.")
        
        # Convert custom time fields to 24-hour format
        try:
            hour_24 = int(hour)
            minute_int = int(minute)
            
            if am_pm == 'PM' and hour_24 != 12:
                hour_24 += 12
            elif am_pm == 'AM' and hour_24 == 12:
                hour_24 = 0
            
            appointment_time = time(hour_24, minute_int)
            cleaned_data['appointment_time'] = appointment_time
        except (ValueError, TypeError):
            raise forms.ValidationError("Invalid time format selected.")
        
        # Check if appointment date is in the past
        if appointment_date and appointment_date < timezone.now().date():
            raise forms.ValidationError("Appointment date cannot be in the past.")
        
        # Check if appointment date is more than 6 months in the future
        if appointment_date:
            max_date = timezone.now().date() + timedelta(days=180)  # 6 months
            if appointment_date > max_date:
                raise forms.ValidationError("Appointment date cannot be more than 6 months in the future.")
        
        # Check if appointment is today and time is in the past
        if appointment_date and appointment_time:
            today = timezone.now().date()
            current_time = timezone.now().time()
            
            if appointment_date == today and appointment_time < current_time:
                raise forms.ValidationError("Appointment time cannot be in the past for today's date.")
            
            # Check if appointment time is within business hours (8 AM to 6 PM)
            business_start = time(8, 0)  # 8:00 AM
            business_end = time(18, 0)   # 6:00 PM
            
            if not (business_start <= appointment_time <= business_end):
                raise forms.ValidationError("Appointment time must be between 8:00 AM and 6:00 PM.")
        
        return cleaned_data
    
    def clean_hour(self):
        hour = self.cleaned_data.get('hour')
        if not hour:
            raise forms.ValidationError("Please select an hour.")
        try:
            hour_int = int(hour)
            if not (1 <= hour_int <= 12):
                raise forms.ValidationError("Hour must be between 1 and 12.")
        except (ValueError, TypeError):
            raise forms.ValidationError("Invalid hour selected.")
        return hour
    
    def clean_minute(self):
        minute = self.cleaned_data.get('minute')
        if not minute:
            raise forms.ValidationError("Please select minutes.")
        try:
            minute_int = int(minute)
            if not (0 <= minute_int <= 59):
                raise forms.ValidationError("Minute must be between 0 and 59.")
        except (ValueError, TypeError):
            raise forms.ValidationError("Invalid minute selected.")
        return minute
    
    def clean_am_pm(self):
        am_pm = self.cleaned_data.get('am_pm')
        if not am_pm:
            raise forms.ValidationError("Please select AM or PM.")
        if am_pm not in ['AM', 'PM']:
            raise forms.ValidationError("Please select a valid AM/PM option.")
        return am_pm
    
    def clean_appointment_date(self):
        appointment_date = self.cleaned_data.get('appointment_date')
        if not appointment_date:
            raise forms.ValidationError("Please select an appointment date.")
        
        # Check if appointment date is in the past
        if appointment_date < timezone.now().date():
            raise forms.ValidationError("Appointment date cannot be in the past.")
        
        # Check if appointment date is more than 6 months in the future
        max_date = timezone.now().date() + timedelta(days=180)  # 6 months
        if appointment_date > max_date:
            raise forms.ValidationError("Appointment date cannot be more than 6 months in the future.")
        
        return appointment_date
    
    def clean_payment_mode(self):
        payment_mode = self.cleaned_data.get('payment_mode')
        if not payment_mode:
            raise forms.ValidationError("Please select a payment mode.")
        return payment_mode

