from django import forms
from django.core.exceptions import ValidationError
from datetime import date, timedelta
import re
from doctor.models import Doctor

def validate_patient_name(value):
    """Validate patient name format"""
    if not value:
        return value
    
    # Allow letters, spaces, hyphens, apostrophes, and dots
    if not re.match(r"^[a-zA-Z\s\-'\.]+$", value):
        raise ValidationError('Name can only contain letters, spaces, hyphens, apostrophes, and dots.')
    
    # Check minimum length
    if len(value.strip()) < 2:
        raise ValidationError('Name must be at least 2 characters long.')
    
    # Check for full name (at least first and last name)
    if len(value.split()) < 2:
        raise ValidationError('Please enter full name (first name and last name).')
    
    return value.strip()

def validate_contact_number(value):
    """Validate contact number format - must be exactly 10 digits"""
    if not value:
        return value
    
    # Remove all non-digit characters
    digits_only = re.sub(r'\D', '', value)
    
    # Check if it's exactly 10 digits
    if len(digits_only) == 10:
        return digits_only
    else:
        raise ValidationError('Contact number must be exactly 10 digits.')

def validate_city_name(value):
    """Validate city name format"""
    if not value:
        return value
    
    # Allow letters, spaces, hyphens, and dots
    if not re.match(r"^[a-zA-Z\s\-\.]+$", value):
        raise ValidationError('City name can only contain letters, spaces, hyphens, and dots.')
    
    # Check minimum length
    if len(value.strip()) < 2:
        raise ValidationError('City name must be at least 2 characters long.')
    
    return value.strip()

def validate_address(value):
    """Validate address field"""
    if not value:
        return value
    
    # Clean and validate address
    cleaned_value = ' '.join(value.split())
    if len(cleaned_value) < 10:
        raise ValidationError('Address must be at least 10 characters long.')
    
    return cleaned_value

def validate_abha_id(value):
    """Validate ABHA ID - must be exactly 14 digits"""
    if not value:
        raise ValidationError('ABHA ID is required. Please enter your 14-digit ABHA ID.')
    
    # Remove all non-digit characters
    digits_only = re.sub(r'\D', '', value)
    
    if len(digits_only) == 14:
        return digits_only
    else:
        raise ValidationError('ABHA ID must be exactly 14 digits. Please enter a valid ABHA ID.')

def validate_emergency_contact(value):
    """Validate emergency contact number"""
    if not value:
        return value
    
    # Remove all non-digit characters
    digits_only = re.sub(r'\D', '', value)
    
    # Check if it's a valid Indian mobile number (10 digits starting with 6-9)
    if len(digits_only) == 10:
        if digits_only[0] in '6789':
            return digits_only
        else:
            raise ValidationError('Emergency contact number must start with 6, 7, 8, or 9.')
    elif len(digits_only) == 12 and digits_only.startswith('91'):
        # With country code
        if digits_only[2] in '6789':
            return digits_only[2:]  # Remove country code
        else:
            raise ValidationError('Emergency contact number must start with 6, 7, 8, or 9.')
    else:
        raise ValidationError('Enter a valid 10-digit mobile number or 12-digit number with country code (+91).')


class ReceptionistPatientRegistrationForm(forms.Form):
    """Form for receptionist to register new patients - comprehensive version"""
    # Basic Information
    username = forms.CharField(
        max_length=150,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Username'
        }),
        label='Username',
        help_text='Required. Enter a unique username for the patient.'
    )
    
    first_name = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'First Name'
        }),
        label='First Name',
        help_text='Required. Enter patient first name.'
    )
    
    last_name = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Last Name'
        }),
        label='Last Name',
        help_text='Required. Enter patient last name.'
    )
    
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Email Address'
        }),
        label='Email',
        help_text='Required. Enter a valid email address.'
    )
    
    gender = forms.ChoiceField(
        choices=[
            ('', 'Select Gender'),
            ('Male', 'Male'),
            ('Female', 'Female'),
            ('Other', 'Other')
        ],
        required=True,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Gender',
        help_text='Required. Select patient gender.'
    )
    
    dob = forms.DateField(
        required=True,
        widget=forms.DateInput(attrs={
            'class': 'form-control',
            'type': 'date',
            'max': (date.today() - timedelta(days=1)).strftime('%Y-%m-%d'),
            'min': (date.today() - timedelta(days=120*365)).strftime('%Y-%m-%d')
        }),
        label='Date of Birth',
        help_text='Required. Select patient date of birth.'
    )
    
    contact_number = forms.CharField(
        max_length=15,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Contact Number'
        }),
        label='Contact No.',
        validators=[validate_contact_number],
        help_text='Required. Enter a valid 10-digit contact number.'
    )
    
    address = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Enter complete address'
        }),
        label='Address',
        validators=[validate_address],
        help_text='Required. Enter complete residential address.'
    )
    
    city = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'City'
        }),
        label='City',
        validators=[validate_city_name],
        help_text='Required. Enter city name.'
    )
    
    pincode = forms.CharField(
        max_length=6,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Pincode',
            'pattern': '[0-9]{6}',
            'title': 'Enter 6-digit pincode'
        }),
        label='Pincode',
        help_text='Required. Enter 6-digit pincode.'
    )
    
    password = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Password'
        }),
        label='Password',
        min_length=8,
        help_text='Required. Password must be at least 8 characters long.'
    )
    
    confirm_password = forms.CharField(
        required=True,
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirm Password'
        }),
        label='Confirm Password',
        help_text='Required. Re-enter the password to confirm.'
    )
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        if username:
            # Check if username already exists in CustomUser
            from care.models import CustomUser
            if CustomUser.objects.filter(username=username).exists():
                raise forms.ValidationError("This username is already taken. Please choose a different username.")
        return username
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            # Check if email already exists in CustomUser
            from care.models import CustomUser
            if CustomUser.objects.filter(email=email).exists():
                raise forms.ValidationError("A user with this email already exists.")
        return email
    
    def clean_contact_number(self):
        contact_number = self.cleaned_data.get('contact_number')
        if contact_number:
            # Remove all non-digit characters
            digits_only = re.sub(r'\D', '', contact_number)
            
            # Check if it's exactly 10 digits
            if len(digits_only) == 10:
                # Check if contact number already exists
                from care.models import CustomUser
                if CustomUser.objects.filter(contact_number=digits_only).exists():
                    raise forms.ValidationError("A user with this contact number already exists.")
                return digits_only
            else:
                raise forms.ValidationError("Contact number must be exactly 10 digits.")
        return contact_number
    
    def clean_pincode(self):
        pincode = self.cleaned_data.get('pincode')
        if pincode:
            # Remove all non-digit characters
            digits_only = re.sub(r'\D', '', pincode)
            
            if len(digits_only) == 6:
                return digits_only
            else:
                raise forms.ValidationError("Please enter a valid 6-digit pincode.")
        return pincode
    
    def clean_password(self):
        password = self.cleaned_data.get('password')
        if password:
            # Length validation
            if len(password) < 8:
                raise forms.ValidationError("Password must be at least 8 characters long.")
            
            if len(password) > 128:
                raise forms.ValidationError("Password is too long. Maximum 128 characters allowed.")
        return password
    
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        
        if password and confirm_password:
            if password != confirm_password:
                raise forms.ValidationError("Passwords don't match.")
        
        return cleaned_data


class SimpleAppointmentBookingForm(forms.Form):
    """Simple form for booking appointments for existing patients"""
    doctor = forms.ModelChoiceField(
        queryset=Doctor.objects.none(),
        required=True,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Doctor',
        help_text='Required. Select the doctor for the appointment.'
    )
    
    appointment_date = forms.DateField(
        required=True,
        widget=forms.DateInput(attrs={
            'class': 'form-control',
            'type': 'date',
            'min': date.today().strftime('%Y-%m-%d')
        }),
        label='Appointment Date',
        help_text='Required. Select the appointment date.'
    )
    
    appointment_time = forms.TimeField(
        required=True,
        widget=forms.TimeInput(attrs={
            'class': 'form-control',
            'type': 'time'
        }),
        label='Appointment Time',
        help_text='Required. Select the appointment time.'
    )
    
    symptoms = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Describe symptoms or reason for appointment'
        }),
        label='Symptoms/Reason',
        help_text='Optional. Describe the symptoms or reason for the appointment.'
    )
    
    def __init__(self, *args, **kwargs):
        hospital = kwargs.pop('hospital', None)
        super().__init__(*args, **kwargs)
        if hospital:
            self.fields['doctor'].queryset = Doctor.objects.filter(hospital=hospital)
    
    def clean_appointment_date(self):
        appointment_date = self.cleaned_data.get('appointment_date')
        if appointment_date:
            if appointment_date < date.today():
                raise forms.ValidationError("Appointment date cannot be in the past.")
        return appointment_date
