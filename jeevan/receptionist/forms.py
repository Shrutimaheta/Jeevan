from django import forms
from django.core.validators import RegexValidator, FileExtensionValidator, MinValueValidator, MaxValueValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from datetime import date, timedelta
import re
from .models import Receptionist
from django.contrib.auth import get_user_model
# Resolve the active user model (e.g., care.CustomUser)
CustomUser = get_user_model()

# Custom Validators
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

def validate_date_of_birth(value):
    """Validate date of birth - must be between 18 and 65 years"""
    if not value:
        return value
    
    today = date.today()
    age = today.year - value.year - ((today.month, today.day) < (value.month, value.day))
    
    if age < 18:
        raise ValidationError('Age must be at least 18 years.')
    elif age > 65:
        raise ValidationError('Age must not exceed 65 years.')
    
    return value

def validate_profile_picture_size(value):
    """Validate profile picture file size (max 5MB)"""
    if value:
        if value.size > 5 * 1024 * 1024:  # 5MB
            raise ValidationError('Profile picture size must not exceed 5MB.')
    return value

def validate_name_format(value):
    """Validate name contains only letters, spaces, and common name characters"""
    if not value:
        return value
    
    # Allow letters, spaces, hyphens, apostrophes, and dots
    if not re.match(r"^[a-zA-Z\s\-'\.]+$", value):
        raise ValidationError('Name can only contain letters, spaces, hyphens, apostrophes, and dots.')
    
    # Check minimum length
    if len(value.strip()) < 2:
        raise ValidationError('Name must be at least 2 characters long.')
    
    return value.strip()

def validate_qualification(value):
    """Validate qualification field"""
    if not value:
        return value
    
    # Remove extra spaces and check length
    cleaned_value = ' '.join(value.split())
    if len(cleaned_value) < 2:
        raise ValidationError('Qualification must be at least 2 characters long.')
    
    return cleaned_value

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
    """ABHA removed: accept any input (no-op validator)."""
    return ''

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

class ReceptionistLoginForm(forms.Form):
    """Form for receptionist login"""
    username = forms.CharField(
        max_length=150,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Username',
            'required': True
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Password',
            'required': True
        })
    )

class ReceptionistProfileForm(forms.ModelForm):
    """Form for receptionist profile editing with comprehensive validations"""
    email = forms.EmailField(
        required=False, 
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Email address',
            'readonly': True,
            'style': 'background-color: #f8f9fa; cursor: not-allowed;'
        }),
        help_text='Read-only. Email is stored in your user account.'
    )
    full_name = forms.CharField(
        max_length=255,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter your full name'
        }),
        validators=[validate_name_format],
        help_text='Required. Only letters, spaces, hyphens, apostrophes, and dots allowed.'
    )
    contact_number = forms.CharField(
        max_length=15,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Contact number',
            'readonly': True,
            'style': 'background-color: #f8f9fa; cursor: not-allowed;'
        }),
        validators=[validate_contact_number],
        help_text='Read-only. Contact number is stored in your user account.'
    )
    gender = forms.ChoiceField(
        choices=Receptionist.GENDER_CHOICES, 
        widget=forms.Select(attrs={'class': 'form-control'}),
        help_text='Required. Select your gender.'
    )
    dob = forms.DateField(
        required=False, 
        widget=forms.DateInput(attrs={
            'class': 'form-control', 
            'type': 'date',
            'max': (date.today() - timedelta(days=18*365)).strftime('%Y-%m-%d'),
            'min': (date.today() - timedelta(days=65*365)).strftime('%Y-%m-%d')
        }),
        validators=[validate_date_of_birth],
        help_text='Optional. Age must be between 18 and 65 years.'
    )
    address = forms.CharField(
        required=False, 
        widget=forms.Textarea(attrs={
            'class': 'form-control', 
            'rows': 3,
            'placeholder': 'Enter your complete address'
        }),
        help_text='Optional. Enter your complete residential address.'
    )
    qualification = forms.CharField(
        required=False, 
        max_length=255,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'e.g., B.Sc Nursing, Diploma in Healthcare'
        }),
        validators=[validate_qualification],
        help_text='Optional. Enter your educational qualification.'
    )
    experience = forms.IntegerField(
        required=False, 
        widget=forms.NumberInput(attrs={
            'class': 'form-control', 
            'min': '0',
            'max': '50',
            'placeholder': 'Years of experience'
        }),
        validators=[MinValueValidator(0), MaxValueValidator(50)],
        help_text='Optional. Years of experience (0-50).'
    )
    profile_picture = forms.ImageField(
        required=False, 
        widget=forms.FileInput(attrs={
            'class': 'form-control',
            'accept': 'image/*'
        }),
        validators=[
            FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png', 'gif']),
            validate_profile_picture_size
        ],
        help_text='Optional. Upload JPG, PNG or GIF. Max size: 5MB.'
    )

    class Meta:
        model = Receptionist
        fields = ['full_name', 'email', 'contact_number', 'gender', 'dob', 'address', 'qualification', 'experience', 'profile_picture']
        labels = {
            'contact_number': 'Contact Number',
            'profile_picture': 'Profile Picture',
            'dob': 'Date of Birth',
            'address': 'Address',
            'qualification': 'Qualification',
            'experience': 'Experience (Years)',
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Populate email and contact_number from user (database) - these are read-only
        if self.instance and self.instance.pk and hasattr(self.instance, 'user'):
            if self.instance.user:
                # Set initial values from user's email and contact_number
                if self.instance.user.email:
                    self.fields['email'].initial = self.instance.user.email
                if self.instance.user.contact_number:
                    self.fields['contact_number'].initial = self.instance.user.contact_number

    def clean_email(self):
        # Email is read-only - always return the value from user (database)
        if self.instance and hasattr(self.instance, 'user') and self.instance.user:
            return self.instance.user.email
        return self.cleaned_data.get('email', '')

    def clean_contact_number(self):
        # Contact number is read-only - always return the value from user (database)
        if self.instance and hasattr(self.instance, 'user') and self.instance.user:
            return self.instance.user.contact_number
        return self.cleaned_data.get('contact_number', '')

    def clean_experience(self):
        experience = self.cleaned_data.get('experience')
        if experience is not None:
            if experience < 0:
                raise forms.ValidationError("Experience cannot be negative.")
            if experience > 50:
                raise forms.ValidationError("Experience cannot exceed 50 years.")
        return experience

    def clean_address(self):
        address = self.cleaned_data.get('address')
        if address:
            # Clean and validate address
            cleaned_address = ' '.join(address.split())
            if len(cleaned_address) < 10:
                raise forms.ValidationError("Address must be at least 10 characters long.")
            return cleaned_address
        return address

    def clean_full_name(self):
        full_name = self.cleaned_data.get('full_name')
        if full_name:
            # Additional name validation
            if len(full_name.split()) < 2:
                raise forms.ValidationError("Please enter your full name (first name and last name).")
            
            # Check for excessive length
            if len(full_name) > 100:
                raise forms.ValidationError("Name is too long. Please use a shorter version.")
        
        return full_name

    def save(self, commit=True):
        receptionist = super().save(commit=False)
        # Don't save email and contact_number - they are read-only and stored in user
        # These fields are not part of the Receptionist model, they're in CustomUser
        # Remove these from being saved (they're only for display)
        if commit:
            receptionist.save()
            # Email and contact_number are read-only - don't update them
            # They remain in the CustomUser model and are displayed read-only
        return receptionist

class ReceptionistAdminForm(forms.ModelForm):
    class Meta:
        model = Receptionist
        exclude = ['password']  # Only exclude password
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Make full_name field readonly and auto-populate from user
        if 'user' in self.fields:
            self.fields['user'].widget.attrs.update({
                'onchange': 'populateFullName(this)'
            })
        if 'full_name' in self.fields:
            self.fields['full_name'].widget.attrs.update({
                'readonly': True,
                'style': 'background-color: #f8f9fa;'
            })
    
    def clean_full_name(self):
        # Auto-populate full_name from user if user is selected
        user = self.cleaned_data.get('user')
        if user and hasattr(user, 'full_name'):
            return user.full_name
        return self.cleaned_data.get('full_name')
    
    def clean(self):
        cleaned_data = super().clean()
        user = cleaned_data.get('user')
        
        if user:
            # Check if email is unique across all users
            if hasattr(user, 'email') and user.email:
                from django.contrib.auth import get_user_model
                if get_user_model().objects.filter(email=user.email).exclude(id=user.id).exists():
                    raise forms.ValidationError("A user with this email already exists.")
            
            # Check if contact_number is unique across all users
            if hasattr(user, 'contact_number') and user.contact_number:
                from django.contrib.auth import get_user_model
                if get_user_model().objects.filter(contact_number=user.contact_number).exclude(id=user.id).exists():
                    raise forms.ValidationError("A user with this contact number already exists.")
        
        return cleaned_data


class ReceptionistPatientRegistrationForm(forms.Form):
    """Form for receptionist to register new patients"""
    # Personal Information
    full_name = forms.CharField(
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter patient full name'
        }),
        label='Patient Name',
        validators=[validate_patient_name],
        help_text='Required. Enter full name (first name and last name).'
    )
    
    email = forms.EmailField(
        required=False,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter email address (optional)'
        }),
        label='Email',
        help_text='Optional. Enter a valid email address.'
    )
    
    contact_number = forms.CharField(
        max_length=15,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 10-digit contact number (optional)'
        }),
        label='Contact Number',
        validators=[validate_contact_number],
        help_text='Optional. Enter a valid 10-digit number.'
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
    
    date_of_birth = forms.DateField(
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
    
    blood_group = forms.ChoiceField(
        choices=[
            ('', 'Select Blood Group'),
            ('A+', 'A+'),
            ('A-', 'A-'),
            ('B+', 'B+'),
            ('B-', 'B-'),
            ('AB+', 'AB+'),
            ('AB-', 'AB-'),
            ('O+', 'O+'),
            ('O-', 'O-')
        ],
        required=False,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Blood Group',
        help_text='Optional. Select patient blood group if known.'
    )
    
    # Address Information
    address = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Enter complete address'
        }),
        label='Address',
        validators=[validate_address],
        help_text='Required. Enter complete residential address (minimum 10 characters).'
    )
    
    city = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter city name'
        }),
        label='City',
        validators=[validate_city_name],
        help_text='Required. Enter city name (minimum 2 characters).'
    )
    
    pincode = forms.CharField(
        max_length=6,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter pincode',
            'pattern': '[0-9]{6}',
            'title': 'Enter 6-digit pincode'
        }),
        label='Pincode',
        help_text='Required. Enter 6-digit pincode.'
    )
    
    # Medical Information
    abha_id = forms.CharField(
        max_length=20,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 14-digit ABHA ID',
            'pattern': '[0-9]{14}',
            'title': 'Enter 14-digit ABHA ID',
            'maxlength': '14'
        }),
        label='ABHA ID',
        validators=[validate_abha_id],
        help_text='Required. Enter 14-digit ABHA ID.'
    )
    
    emergency_number = forms.CharField(
        max_length=15,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter emergency contact number'
        }),
        label='Emergency Contact Number',
        validators=[validate_emergency_contact],
        help_text='Required. Enter a valid 10-digit Indian mobile number.'
    )
    
    existing_condition = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'List any existing medical conditions'
        }),
        label='Existing Medical Conditions',
        help_text='Optional. List any existing medical conditions.'
    )
    
    allergies = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'List any known allergies'
        }),
        label='Allergies',
        help_text='Optional. List any known allergies.'
    )
    
    def clean_contact_number(self):
        contact_number = self.cleaned_data.get('contact_number')
        if contact_number:
            # Remove all non-digit characters
            digits_only = re.sub(r'\D', '', contact_number)
            
            # Check if it's exactly 10 digits
            if len(digits_only) == 10:
                return digits_only
            else:
                raise forms.ValidationError("Contact number must be exactly 10 digits.")
        return contact_number
    
    def clean_emergency_number(self):
        emergency_number = self.cleaned_data.get('emergency_number')
        if emergency_number:
            # Remove all non-digit characters
            digits_only = re.sub(r'\D', '', emergency_number)
            
            # Check if it's a valid Indian mobile number
            if len(digits_only) == 10 and digits_only[0] in '6789':
                return digits_only
            elif len(digits_only) == 12 and digits_only.startswith('91'):
                return digits_only[2:]  # Remove country code
            else:
                raise forms.ValidationError("Please enter a valid 10-digit Indian mobile number.")
        return emergency_number
    
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
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            # Check if email already exists in CustomUser
            from care.models import CustomUser
            if CustomUser.objects.filter(email=email).exists():
                raise forms.ValidationError("A user with this email already exists.")
        return email
    
    def clean_abha_id(self):
        # ABHA removed – always return empty string
        return ''
    
    def clean(self):
        cleaned_data = super().clean()
        contact_number = cleaned_data.get('contact_number')
        emergency_number = cleaned_data.get('emergency_number')
        
        # Check if contact number and emergency number are different
        if contact_number and emergency_number and contact_number == emergency_number:
            raise forms.ValidationError("Emergency contact number must be different from patient contact number.")
        
        return cleaned_data

class ReceptionistChangePasswordForm(forms.Form):
    """Form for receptionist to change password with enhanced security"""
    current_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter your current password',
            'required': True
        }),
        label='Current Password',
        help_text='Enter your current password to verify your identity.'
    )
    new_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter new password',
            'required': True
        }),
        label='New Password',
        min_length=8,
        help_text='Password must be at least 8 characters with uppercase, lowercase, number, and special character.'
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirm new password',
            'required': True
        }),
        label='Confirm New Password',
        help_text='Re-enter the new password to confirm.'
    )

    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get('new_password')
        confirm_password = cleaned_data.get('confirm_password')
        current_password = cleaned_data.get('current_password')

        if new_password and confirm_password:
            if new_password != confirm_password:
                raise forms.ValidationError("New passwords don't match.")
            
            # Check if new password is same as current password
            if current_password and new_password == current_password:
                raise forms.ValidationError("New password must be different from current password.")
        
        return cleaned_data


class ReceptionistPatientRegistrationForm(forms.Form):
    """Form for receptionist to register new patients"""
    # Personal Information
    full_name = forms.CharField(
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter patient full name'
        }),
        label='Patient Name',
        validators=[validate_patient_name],
        help_text='Required. Enter full name (first name and last name).'
    )
    
    email = forms.EmailField(
        required=False,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter email address (optional)'
        }),
        label='Email',
        help_text='Optional. Enter a valid email address.'
    )
    
    contact_number = forms.CharField(
        max_length=15,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 10-digit contact number (optional)'
        }),
        label='Contact Number',
        validators=[validate_contact_number],
        help_text='Optional. Enter a valid 10-digit number.'
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
    
    date_of_birth = forms.DateField(
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
    
    blood_group = forms.ChoiceField(
        choices=[
            ('', 'Select Blood Group'),
            ('A+', 'A+'),
            ('A-', 'A-'),
            ('B+', 'B+'),
            ('B-', 'B-'),
            ('AB+', 'AB+'),
            ('AB-', 'AB-'),
            ('O+', 'O+'),
            ('O-', 'O-')
        ],
        required=False,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Blood Group',
        help_text='Optional. Select patient blood group if known.'
    )
    
    # Address Information
    address = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Enter complete address'
        }),
        label='Address',
        validators=[validate_address],
        help_text='Required. Enter complete residential address (minimum 10 characters).'
    )
    
    city = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter city name'
        }),
        label='City',
        validators=[validate_city_name],
        help_text='Required. Enter city name (minimum 2 characters).'
    )
    
    pincode = forms.CharField(
        max_length=6,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter pincode',
            'pattern': '[0-9]{6}',
            'title': 'Enter 6-digit pincode'
        }),
        label='Pincode',
        help_text='Required. Enter 6-digit pincode.'
    )
    
    # Medical Information
    abha_id = forms.CharField(
        max_length=20,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 14-digit ABHA ID',
            'pattern': '[0-9]{14}',
            'title': 'Enter 14-digit ABHA ID',
            'maxlength': '14'
        }),
        label='ABHA ID',
        validators=[validate_abha_id],
        help_text='Required. Enter 14-digit ABHA ID.'
    )
    
    emergency_number = forms.CharField(
        max_length=15,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter emergency contact number'
        }),
        label='Emergency Contact Number',
        validators=[validate_emergency_contact],
        help_text='Required. Enter a valid 10-digit Indian mobile number.'
    )
    
    existing_condition = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'List any existing medical conditions'
        }),
        label='Existing Medical Conditions',
        help_text='Optional. List any existing medical conditions.'
    )
    
    allergies = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'List any known allergies'
        }),
        label='Allergies',
        help_text='Optional. List any known allergies.'
    )
    
    def clean_contact_number(self):
        contact_number = self.cleaned_data.get('contact_number')
        if contact_number:
            # Remove all non-digit characters
            digits_only = re.sub(r'\D', '', contact_number)
            
            # Check if it's exactly 10 digits
            if len(digits_only) == 10:
                return digits_only
            else:
                raise forms.ValidationError("Contact number must be exactly 10 digits.")
        return contact_number
    
    def clean_emergency_number(self):
        emergency_number = self.cleaned_data.get('emergency_number')
        if emergency_number:
            # Remove all non-digit characters
            digits_only = re.sub(r'\D', '', emergency_number)
            
            # Check if it's a valid Indian mobile number
            if len(digits_only) == 10 and digits_only[0] in '6789':
                return digits_only
            elif len(digits_only) == 12 and digits_only.startswith('91'):
                return digits_only[2:]  # Remove country code
            else:
                raise forms.ValidationError("Please enter a valid 10-digit Indian mobile number.")
        return emergency_number
    
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
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            # Check if email already exists in CustomUser
            from care.models import CustomUser
            if CustomUser.objects.filter(email=email).exists():
                raise forms.ValidationError("A user with this email already exists.")
        return email
    
    def clean_abha_id(self):
        abha_id = self.cleaned_data.get('abha_id')
        if not abha_id:
            raise forms.ValidationError("ABHA ID is required. Please enter your 14-digit ABHA ID.")
        
        # Remove all non-digit characters
        digits_only = re.sub(r'\D', '', abha_id)
        
        if len(digits_only) == 14:
            return digits_only
        else:
            raise forms.ValidationError("ABHA ID must be exactly 14 digits. Please enter a valid ABHA ID.")
    
    def clean(self):
        cleaned_data = super().clean()
        contact_number = cleaned_data.get('contact_number')
        emergency_number = cleaned_data.get('emergency_number')
        
        # Check if contact number and emergency number are different
        if contact_number and emergency_number and contact_number == emergency_number:
            raise forms.ValidationError("Emergency contact number must be different from patient contact number.")
        
        return cleaned_data

    def clean_new_password(self):
        new_password = self.cleaned_data.get('new_password')
        if new_password:
            # Length validation
            if len(new_password) < 8:
                raise forms.ValidationError("Password must be at least 8 characters long.")
            
            if len(new_password) > 128:
                raise forms.ValidationError("Password is too long. Maximum 128 characters allowed.")
            
            # Complexity validation
            has_upper = any(c.isupper() for c in new_password)
            has_lower = any(c.islower() for c in new_password)
            has_digit = any(c.isdigit() for c in new_password)
            has_special = any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in new_password)
            
            if not has_upper:
                raise forms.ValidationError("Password must contain at least one uppercase letter.")
            
            if not has_lower:
                raise forms.ValidationError("Password must contain at least one lowercase letter.")
            
            if not has_digit:
                raise forms.ValidationError("Password must contain at least one number.")
            
            if not has_special:
                raise forms.ValidationError("Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?).")
            
            # Common password check
            common_passwords = ['password', '123456', '123456789', 'qwerty', 'abc123', 'password123', 'admin', 'letmein']
            if new_password.lower() in common_passwords:
                raise forms.ValidationError("Password is too common. Please choose a stronger password.")
            
            # Sequential characters check
            if any(new_password[i:i+3] in 'abcdefghijklmnopqrstuvwxyz' or 
                   new_password[i:i+3] in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' or
                   new_password[i:i+3] in '0123456789' for i in range(len(new_password)-2)):
                raise forms.ValidationError("Password contains sequential characters. Please choose a stronger password.")
        
        return new_password


class ReceptionistBookAppointmentForm(forms.Form):
    """Form for booking new appointments by receptionist with comprehensive validation"""
    # Patient Information
    patient_name = forms.CharField(
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter patient full name'
        }),
        label='Patient Name',
        validators=[validate_patient_name],
        help_text='Required. Enter full name (first name and last name).'
    )
    
    email = forms.EmailField(
        required=False,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter email address (optional)'
        }),
        label='Email',
        help_text='Optional. Enter a valid email address.'
    )
    
    contact_number = forms.CharField(
        max_length=15,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 10-digit contact number (optional)'
        }),
        label='Contact Number',
        validators=[validate_contact_number],
        help_text='Optional. Enter a valid 10-digit number.'
    )
    
    gender = forms.ChoiceField(
        choices=[
            ('', 'Select Gender'),
            ('male', 'Male'),
            ('female', 'Female'),
            ('other', 'Other')
        ],
        required=True,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Gender',
        help_text='Required. Select patient gender.'
    )
    
    date_of_birth = forms.DateField(
        required=True,
        widget=forms.DateInput(attrs={
            'class': 'form-control',
            'type': 'date',
            'max': (date.today() - timedelta(days=1)).strftime('%Y-%m-%d'),
            'min': (date.today() - timedelta(days=120*365)).strftime('%Y-%m-%d')
        }),
        label='Date of Birth',
        validators=[validate_date_of_birth],
        help_text='Required. Age must be between 0 and 120 years.'
    )
    
    blood_group = forms.ChoiceField(
        choices=[
            ('', 'Select Blood Group'),
            ('A+', 'A+'),
            ('A-', 'A-'),
            ('B+', 'B+'),
            ('B-', 'B-'),
            ('AB+', 'AB+'),
            ('AB-', 'AB-'),
            ('O+', 'O+'),
            ('O-', 'O-')
        ],
        required=False,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Blood Group',
        help_text='Optional. Select patient blood group if known.'
    )
    
    # Address Information
    address = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Enter complete address'
        }),
        label='Address',
        validators=[validate_address],
        help_text='Required. Enter complete residential address (minimum 10 characters).'
    )
    
    city = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter city name'
        }),
        label='City',
        validators=[validate_city_name],
        help_text='Required. Enter city name (minimum 2 characters).'
    )
    
    pincode = forms.CharField(
        max_length=6,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter pincode',
            'pattern': '[0-9]{6}',
            'title': 'Enter 6-digit pincode'
        }),
        label='Pincode',
        help_text='Required. Enter 6-digit pincode.'
    )
    
    # Medical Information
    abha_id = forms.CharField(
        max_length=20,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 14-digit ABHA ID',
            'pattern': '[0-9]{14}',
            'title': 'Enter 14-digit ABHA ID',
            'maxlength': '14'
        }),
        label='ABHA ID',
        validators=[validate_abha_id],
        help_text='Required. Enter 14-digit ABHA ID.'
    )
    
    emergency_number = forms.CharField(
        max_length=15,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter emergency contact number'
        }),
        label='Emergency Contact Number',
        validators=[validate_emergency_contact],
        help_text='Required. Enter a valid 10-digit Indian mobile number.'
    )
    
    existing_condition = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'List any existing medical conditions'
        }),
        label='Existing Medical Conditions',
        help_text='Optional. List any existing medical conditions.'
    )
    
    allergies = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'List any known allergies'
        }),
        label='Allergies',
        help_text='Optional. List any known allergies.'
    )
    
    # Appointment Details
    doctor = forms.ModelChoiceField(
        queryset=None,  # Will be set in __init__
        required=True,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Select Doctor',
        help_text='Required. Select the doctor for the appointment.'
    )
    
    appointment_date = forms.DateField(
        required=True,
        widget=forms.DateInput(attrs={
            'class': 'form-control',
            'type': 'date',
            'min': date.today().strftime('%Y-%m-%d'),
            'max': (date.today() + timedelta(days=90)).strftime('%Y-%m-%d')
        }),
        label='Preferred Date',
        help_text='Required. Select appointment date (not more than 3 months in advance).'
    )
    
    appointment_time = forms.TimeField(
        required=True,
        widget=forms.TimeInput(attrs={
            'class': 'form-control',
            'type': 'time'
        }),
        label='Preferred Time',
        help_text='Required. Select preferred appointment time.'
    )
    
    symptoms = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Describe symptoms or reason for appointment'
        }),
        label='Symptoms/Reason for Visit',
        help_text='Optional. Describe symptoms or reason for the appointment.'
    )
    
    def __init__(self, *args, **kwargs):
        hospital = kwargs.pop('hospital', None)
        super().__init__(*args, **kwargs)
        
        if hospital:
            from doctor.models import Doctor
            self.fields['doctor'].queryset = Doctor.objects.filter(hospital=hospital)
    
    def clean_contact_number(self):
        contact_number = self.cleaned_data.get('contact_number')
        if contact_number:
            # Remove all non-digit characters
            digits_only = re.sub(r'\D', '', contact_number)
            
            # Check if it's exactly 10 digits
            if len(digits_only) == 10:
                return digits_only
            else:
                raise forms.ValidationError("Contact number must be exactly 10 digits.")
        return contact_number
    
    def clean_emergency_number(self):
        emergency_number = self.cleaned_data.get('emergency_number')
        if emergency_number:
            # Remove all non-digit characters
            digits_only = re.sub(r'\D', '', emergency_number)
            
            # Check if it's a valid Indian mobile number
            if len(digits_only) == 10 and digits_only[0] in '6789':
                return digits_only
            elif len(digits_only) == 12 and digits_only.startswith('91'):
                return digits_only[2:]  # Remove country code
            else:
                raise forms.ValidationError("Please enter a valid 10-digit Indian mobile number.")
        return emergency_number
    
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
    
    def clean_appointment_date(self):
        appointment_date = self.cleaned_data.get('appointment_date')
        if appointment_date:
            from datetime import date
            today = date.today()
            
            if appointment_date < today:
                raise forms.ValidationError("Appointment date cannot be in the past.")
            
            # Check if appointment is not more than 3 months in advance
            from datetime import timedelta
            max_date = today + timedelta(days=90)
            if appointment_date > max_date:
                raise forms.ValidationError("Appointment cannot be booked more than 3 months in advance.")
        
        return appointment_date
    
    def clean_date_of_birth(self):
        date_of_birth = self.cleaned_data.get('date_of_birth')
        if date_of_birth:
            from datetime import date
            today = date.today()
            age = today.year - date_of_birth.year - ((today.month, today.day) < (date_of_birth.month, date_of_birth.day))
            
            if age < 0:
                raise forms.ValidationError("Date of birth cannot be in the future.")
            elif age > 120:
                raise forms.ValidationError("Please enter a valid date of birth.")
        
        return date_of_birth
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            # Check if email already exists in CustomUser
            from care.models import CustomUser
            if CustomUser.objects.filter(email=email).exists():
                raise forms.ValidationError("A user with this email already exists.")
        return email
    
    def clean_abha_id(self):
        abha_id = self.cleaned_data.get('abha_id')
        if not abha_id:
            raise forms.ValidationError("ABHA ID is required. Please enter your 14-digit ABHA ID.")
        
        # Remove all non-digit characters
        digits_only = re.sub(r'\D', '', abha_id)
        
        if len(digits_only) == 14:
            return digits_only
        else:
            raise forms.ValidationError("ABHA ID must be exactly 14 digits. Please enter a valid ABHA ID.")
    
    def clean_patient_name(self):
        patient_name = self.cleaned_data.get('patient_name')
        if patient_name:
            # Additional name validation
            if len(patient_name.split()) < 2:
                raise forms.ValidationError("Please enter full name (first name and last name).")
            
            # Check for excessive length
            if len(patient_name) > 100:
                raise forms.ValidationError("Name is too long. Please use a shorter version.")
        
        return patient_name
    
    def clean_city(self):
        city = self.cleaned_data.get('city')
        if city:
            # Additional city validation
            if len(city.strip()) < 2:
                raise forms.ValidationError("City name must be at least 2 characters long.")
            
            # Check for excessive length
            if len(city) > 50:
                raise forms.ValidationError("City name is too long. Please use a shorter version.")
        
        return city
    
    def clean_address(self):
        address = self.cleaned_data.get('address')
        if address:
            # Clean and validate address
            cleaned_address = ' '.join(address.split())
            if len(cleaned_address) < 10:
                raise forms.ValidationError("Address must be at least 10 characters long.")
            
            # Check for excessive length
            if len(cleaned_address) > 500:
                raise forms.ValidationError("Address is too long. Please use a shorter version.")
            
            return cleaned_address
        return address
    
    def clean_existing_condition(self):
        existing_condition = self.cleaned_data.get('existing_condition')
        if existing_condition:
            # Clean and validate existing condition
            cleaned_condition = ' '.join(existing_condition.split())
            if len(cleaned_condition) > 500:
                raise forms.ValidationError("Existing condition description is too long. Please use a shorter version.")
            return cleaned_condition
        return existing_condition
    
    def clean_allergies(self):
        allergies = self.cleaned_data.get('allergies')
        if allergies:
            # Clean and validate allergies
            cleaned_allergies = ' '.join(allergies.split())
            if len(cleaned_allergies) > 500:
                raise forms.ValidationError("Allergies description is too long. Please use a shorter version.")
            return cleaned_allergies
        return allergies
    
    def clean_symptoms(self):
        symptoms = self.cleaned_data.get('symptoms')
        if symptoms:
            # Clean and validate symptoms
            cleaned_symptoms = ' '.join(symptoms.split())
            if len(cleaned_symptoms) > 500:
                raise forms.ValidationError("Symptoms description is too long. Please use a shorter version.")
            return cleaned_symptoms
        return symptoms
    
    def clean(self):
        cleaned_data = super().clean()
        contact_number = cleaned_data.get('contact_number')
        emergency_number = cleaned_data.get('emergency_number')
        
        # Check if contact number and emergency number are different
        if contact_number and emergency_number and contact_number == emergency_number:
            raise forms.ValidationError("Emergency contact number must be different from patient contact number.")
        
        return cleaned_data


class ReceptionistPatientRegistrationForm(forms.Form):
    """Form for receptionist to register new patients"""
    # Personal Information
    full_name = forms.CharField(
        max_length=255,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter patient full name'
        }),
        label='Patient Name',
        validators=[validate_patient_name],
        help_text='Required. Enter full name (first name and last name).'
    )
    
    email = forms.EmailField(
        required=False,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter email address (optional)'
        }),
        label='Email',
        help_text='Optional. Enter a valid email address.'
    )
    
    contact_number = forms.CharField(
        max_length=15,
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 10-digit contact number (optional)'
        }),
        label='Contact Number',
        validators=[validate_contact_number],
        help_text='Optional. Enter a valid 10-digit number.'
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
    
    date_of_birth = forms.DateField(
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
    
    blood_group = forms.ChoiceField(
        choices=[
            ('', 'Select Blood Group'),
            ('A+', 'A+'),
            ('A-', 'A-'),
            ('B+', 'B+'),
            ('B-', 'B-'),
            ('AB+', 'AB+'),
            ('AB-', 'AB-'),
            ('O+', 'O+'),
            ('O-', 'O-')
        ],
        required=False,
        widget=forms.Select(attrs={'class': 'form-control'}),
        label='Blood Group',
        help_text='Optional. Select patient blood group if known.'
    )
    
    # Address Information
    address = forms.CharField(
        required=True,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'Enter complete address'
        }),
        label='Address',
        validators=[validate_address],
        help_text='Required. Enter complete residential address (minimum 10 characters).'
    )
    
    city = forms.CharField(
        max_length=100,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter city name'
        }),
        label='City',
        validators=[validate_city_name],
        help_text='Required. Enter city name (minimum 2 characters).'
    )
    
    pincode = forms.CharField(
        max_length=6,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter pincode',
            'pattern': '[0-9]{6}',
            'title': 'Enter 6-digit pincode'
        }),
        label='Pincode',
        help_text='Required. Enter 6-digit pincode.'
    )
    
    # Medical Information
    abha_id = forms.CharField(
        max_length=20,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter 14-digit ABHA ID',
            'pattern': '[0-9]{14}',
            'title': 'Enter 14-digit ABHA ID',
            'maxlength': '14'
        }),
        label='ABHA ID',
        validators=[validate_abha_id],
        help_text='Required. Enter 14-digit ABHA ID.'
    )
    
    emergency_number = forms.CharField(
        max_length=15,
        required=True,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter emergency contact number'
        }),
        label='Emergency Contact Number',
        validators=[validate_emergency_contact],
        help_text='Required. Enter a valid 10-digit Indian mobile number.'
    )
    
    existing_condition = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'List any existing medical conditions'
        }),
        label='Existing Medical Conditions',
        help_text='Optional. List any existing medical conditions.'
    )
    
    allergies = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 3,
            'placeholder': 'List any known allergies'
        }),
        label='Allergies',
        help_text='Optional. List any known allergies.'
    )
    
    def clean_contact_number(self):
        contact_number = self.cleaned_data.get('contact_number')
        if contact_number:
            # Remove all non-digit characters
            digits_only = re.sub(r'\D', '', contact_number)
            
            # Check if it's exactly 10 digits
            if len(digits_only) == 10:
                return digits_only
            else:
                raise forms.ValidationError("Contact number must be exactly 10 digits.")
        return contact_number
    
    def clean_emergency_number(self):
        emergency_number = self.cleaned_data.get('emergency_number')
        if emergency_number:
            # Remove all non-digit characters
            digits_only = re.sub(r'\D', '', emergency_number)
            
            # Check if it's a valid Indian mobile number
            if len(digits_only) == 10 and digits_only[0] in '6789':
                return digits_only
            elif len(digits_only) == 12 and digits_only.startswith('91'):
                return digits_only[2:]  # Remove country code
            else:
                raise forms.ValidationError("Please enter a valid 10-digit Indian mobile number.")
        return emergency_number
    
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
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            # Check if email already exists in CustomUser
            from care.models import CustomUser
            if CustomUser.objects.filter(email=email).exists():
                raise forms.ValidationError("A user with this email already exists.")
        return email
    
    def clean_abha_id(self):
        abha_id = self.cleaned_data.get('abha_id')
        if not abha_id:
            raise forms.ValidationError("ABHA ID is required. Please enter your 14-digit ABHA ID.")
        
        # Remove all non-digit characters
        digits_only = re.sub(r'\D', '', abha_id)
        
        if len(digits_only) == 14:
            return digits_only
        else:
            raise forms.ValidationError("ABHA ID must be exactly 14 digits. Please enter a valid ABHA ID.")
    
    def clean(self):
        cleaned_data = super().clean()
        contact_number = cleaned_data.get('contact_number')
        emergency_number = cleaned_data.get('emergency_number')
        
        # Check if contact number and emergency number are different
        if contact_number and emergency_number and contact_number == emergency_number:
            raise forms.ValidationError("Emergency contact number must be different from patient contact number.")
        
        return cleaned_data
