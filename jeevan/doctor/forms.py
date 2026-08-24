from django import forms
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, FileExtensionValidator
from django.core.files.images import get_image_dimensions
import re
from datetime import date, datetime, timedelta
from .models import AppointmentPrescription, Doctor
from care.models import Hospital, Specialization

class AppointmentPrescriptionForm(forms.ModelForm):
    class Meta:
        model = AppointmentPrescription
        fields = [
            'diagnosis', 'snomed_diagnosis_code', 'snomed_diagnosis_display', 'medications', 'tests_recommended', 'advice', 'follow_up_date'
        ]
        widgets = {
            'diagnosis': forms.Textarea(attrs={'rows':3, 'class':'form-control'}),
            'snomed_diagnosis_code': forms.TextInput(attrs={'class':'form-control', 'placeholder':'e.g. 22298006'}),
            'snomed_diagnosis_display': forms.TextInput(attrs={'class':'form-control', 'placeholder':'e.g. Myocardial infarction'}),
            'medications': forms.Textarea(attrs={'rows':5, 'class':'form-control', 'placeholder':'Drug Name - Dose - Frequency - Duration'}),
            'tests_recommended': forms.Textarea(attrs={'rows':3, 'class':'form-control'}),
            'advice': forms.Textarea(attrs={'rows':3, 'class':'form-control'}),
            'follow_up_date': forms.DateInput(attrs={'type':'date', 'class':'form-control'}),
        }
    
    def __init__(self, *args, **kwargs):
        self.appointment = kwargs.pop('appointment', None)
        super().__init__(*args, **kwargs)
        
        # Set minimum date for follow-up date to be after appointment date
        if self.appointment and self.appointment.appointment_date:
            min_date = self.appointment.appointment_date + timedelta(days=1)
            self.fields['follow_up_date'].widget.attrs['min'] = min_date.strftime('%Y-%m-%d')
    
    def clean_follow_up_date(self):
        follow_up_date = self.cleaned_data.get('follow_up_date')
        
        if follow_up_date and self.appointment and self.appointment.appointment_date:
            if follow_up_date <= self.appointment.appointment_date:
                raise ValidationError(
                    f'Follow-up date must be after the appointment date ({self.appointment.appointment_date.strftime("%B %d, %Y")}).'
                )
        
        return follow_up_date

class DoctorProfileForm(forms.ModelForm):
    # Custom fields for user-related data
    email = forms.EmailField(
        required=True,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter your email address',
            'maxlength': '254'
        })
    )
    
    # Custom validators
    name_validator = RegexValidator(
        regex=r'^[a-zA-Z\s\.\-]+$',
        message='Name can only contain letters, spaces, dots, and hyphens'
    )
    
    registration_validator = RegexValidator(
        regex=r'^[A-Z0-9\-]+$',
        message='Registration number can only contain uppercase letters, numbers, and hyphens'
    )

    class Meta:
        model = Doctor
        fields = [
            'full_name', 'gender', 'dob',
            'registration_number', 'experience', 'qualification', 'address',
            'profile_picture', 'is_active'
        ]
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter your full name',
                'maxlength': '255',
                'required': True
            }),
            'gender': forms.Select(attrs={
                'class': 'form-control',
                'required': True
            }),
            'dob': forms.DateInput(attrs={
                'type': 'date',
                'class': 'form-control',
                'max': date.today().strftime('%Y-%m-%d')
            }),
            'registration_number': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter medical registration number',
                'maxlength': '50'
            }),
            'experience': forms.NumberInput(attrs={
                'class': 'form-control',
                'min': '0',
                'max': '50'
            }),
            'qualification': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'e.g., MBBS, MD, MS',
                'maxlength': '255'
            }),
            'address': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 3,
                'placeholder': 'Enter your full address'
            }),
            'profile_picture': forms.FileInput(attrs={
                'class': 'form-control',
                'accept': 'image/*',
                'style': 'display: none;'
            }),
            'is_active': forms.CheckboxInput(attrs={
                'class': 'form-check-input'
            })
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        
        # Add custom validation attributes
        self.fields['full_name'].validators.append(self.name_validator)
        self.fields['registration_number'].validators.append(self.registration_validator)
        
        # Populate email field with current value if editing existing doctor
        if self.instance and self.instance.pk and hasattr(self.instance, 'user'):
            self.fields['email'].initial = self.instance.user.email

    def clean_full_name(self):
        full_name = self.cleaned_data.get('full_name')
        
        if not full_name:
            raise ValidationError('Full name is required.')
        
        # Remove extra spaces and check length
        full_name = ' '.join(full_name.split())
        
        if len(full_name.strip()) < 2:
            raise ValidationError('Full name must be at least 2 characters long.')
        
        if len(full_name) > 255:
            raise ValidationError('Full name cannot exceed 255 characters.')
        
        # Check for valid characters
        if not re.match(r'^[a-zA-Z\s\.\-]+$', full_name):
            raise ValidationError('Name can only contain letters, spaces, dots, and hyphens.')
        
        # Check for consecutive special characters
        if re.search(r'[\.\-]{2,}', full_name):
            raise ValidationError('Name cannot contain consecutive dots or hyphens.')
        
        # Check for names starting or ending with special characters
        if full_name.startswith(('.', '-')) or full_name.endswith(('.', '-')):
            raise ValidationError('Name cannot start or end with dots or hyphens.')
        
        return full_name.strip()

    def clean_registration_number(self):
        registration_number = self.cleaned_data.get('registration_number')
        
        if registration_number:
            # Check for duplicate registration numbers (excluding current doctor)
            if self.instance.pk:
                existing_doctor = Doctor.objects.filter(
                    registration_number=registration_number
                ).exclude(pk=self.instance.pk).first()
                
                if existing_doctor:
                    raise ValidationError('This registration number is already registered with another doctor.')
            else:
                existing_doctor = Doctor.objects.filter(registration_number=registration_number).first()
                if existing_doctor:
                    raise ValidationError('This registration number is already registered with another doctor.')
        
        return registration_number

    def clean_gender(self):
        gender = self.cleaned_data.get('gender')
        
        if not gender:
            raise ValidationError('Gender selection is required.')
        
        valid_genders = ['Male', 'Female', 'Other']
        if gender not in valid_genders:
            raise ValidationError('Please select a valid gender option.')
        
        return gender

    def clean_dob(self):
        dob = self.cleaned_data.get('dob')
        
        if dob:
            # Check if date is not in the future
            if dob > date.today():
                raise ValidationError('Date of birth cannot be in the future.')
            
            # Check if age is reasonable (between 18 and 100 years)
            today = date.today()
            age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
            
            if age < 18:
                raise ValidationError('Doctor must be at least 18 years old.')
            
            if age > 100:
                raise ValidationError('Please enter a valid date of birth.')
        
        return dob

    def clean_experience(self):
        experience = self.cleaned_data.get('experience')
        
        if experience is not None:
            if experience < 0:
                raise ValidationError('Experience cannot be negative.')
            
            if experience > 50:
                raise ValidationError('Experience cannot exceed 50 years.')
            
            # Cross-validation with date of birth
            dob = self.cleaned_data.get('dob')
            if dob:
                today = date.today()
                age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
                
                if age < 18:
                    raise ValidationError('Doctor must be at least 18 years old.')
                
                # Experience should be reasonable compared to age
                if experience > (age - 18):
                    raise ValidationError('Experience cannot exceed the time since turning 18.')
        
        return experience

    def clean_qualification(self):
        qualification = self.cleaned_data.get('qualification')
        
        if qualification:
            qualification = qualification.strip()
            
            if len(qualification) < 2:
                raise ValidationError('Qualification must be at least 2 characters long.')
            
            if len(qualification) > 255:
                raise ValidationError('Qualification cannot exceed 255 characters.')
            
            # Check for valid characters (letters, numbers, spaces, commas, periods, hyphens)
            if not re.match(r'^[a-zA-Z0-9\s,\.\-]+$', qualification):
                raise ValidationError('Qualification can only contain letters, numbers, spaces, commas, periods, and hyphens.')
            
            # Check for common medical qualifications
            valid_qualifications = ['MBBS', 'MD', 'MS', 'DM', 'MCh', 'DNB', 'MRCP', 'FRCS', 'PhD', 'MSc', 'BDS', 'MDS']
            qualification_upper = qualification.upper()
            
            # Check if qualification contains at least one valid medical degree
            has_valid_degree = any(degree in qualification_upper for degree in valid_qualifications)
            if not has_valid_degree:
                raise ValidationError('Please enter a valid medical qualification (e.g., MBBS, MD, MS, etc.).')
        
        return qualification

    def clean_address(self):
        address = self.cleaned_data.get('address')
        
        if address:
            address = address.strip()
            
            if len(address) < 10:
                raise ValidationError('Address must be at least 10 characters long.')
            
            if len(address) > 1000:
                raise ValidationError('Address cannot exceed 1000 characters.')
            
            # Check for minimum address components
            address_lower = address.lower()
            required_components = ['street', 'city', 'state', 'country', 'pincode', 'zip']
            
            # Check if address contains at least some location indicators
            has_location_indicators = any(component in address_lower for component in ['street', 'road', 'avenue', 'lane', 'city', 'state', 'country', 'pincode', 'zip', 'postal'])
            
            if not has_location_indicators:
                raise ValidationError('Please provide a complete address with street, city, state, and postal code.')
        
        return address

    def clean_profile_picture(self):
        profile_picture = self.cleaned_data.get('profile_picture')
        
        # If no new file uploaded, keep the existing one
        if not profile_picture:
            # Return the existing instance's profile_picture if it exists
            if self.instance and self.instance.pk:
                return self.instance.profile_picture
            return None
        
        # Validate only if a new file was uploaded
            # Check file size (max 5MB)
            if profile_picture.size > 5 * 1024 * 1024:
                raise ValidationError('Profile picture size cannot exceed 5MB.')
            
            # Check file extension
            allowed_extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp']
            file_extension = profile_picture.name.split('.')[-1].lower()
            
            if file_extension not in allowed_extensions:
                raise ValidationError('Profile picture must be a valid image file (JPG, PNG, GIF, or WebP).')
            
            # Check image dimensions (optional - can be resource intensive)
            try:
                from PIL import Image
                image = Image.open(profile_picture)
                width, height = image.size
                
                # Check minimum dimensions
                if width < 100 or height < 100:
                    raise ValidationError('Profile picture must be at least 100x100 pixels.')
                
                # Check maximum dimensions
                if width > 2000 or height > 2000:
                    raise ValidationError('Profile picture dimensions cannot exceed 2000x2000 pixels.')
                
            except ImportError:
                # PIL not available, skip dimension validation
                pass
            except Exception as e:
                raise ValidationError('Invalid image file. Please upload a valid image.')
        
        return profile_picture

    def clean_email(self):
        email = self.cleaned_data.get('email')
        
        if not email:
            raise ValidationError('Email address is required.')
        
        # Check email format
        if not email or '@' not in email:
            raise ValidationError('Please enter a valid email address.')
        
        # Check for duplicate emails (excluding current doctor's user)
        if self.instance and self.instance.pk and hasattr(self.instance, 'user'):
            # Editing existing doctor - check if email is taken by other users
            from care.models import CustomUser
            existing_user = CustomUser.objects.filter(email=email).exclude(pk=self.instance.user.pk).first()
            if existing_user:
                raise ValidationError('This email address is already registered with another user.')
        else:
            # Creating new doctor - check if email is taken
            from care.models import CustomUser
            existing_user = CustomUser.objects.filter(email=email).first()
            if existing_user:
                raise ValidationError('This email address is already registered.')
        
        return email.lower().strip()

    def clean_is_active(self):
        is_active = self.cleaned_data.get('is_active')
        
        # This is a boolean field, so we just return it as-is
        # Additional business logic can be added here if needed
        return is_active

    def clean(self):
        cleaned_data = super().clean()
        
        # Cross-field validation
        full_name = cleaned_data.get('full_name')
        experience = cleaned_data.get('experience')
        dob = cleaned_data.get('dob')
        
        # Additional cross-field validations
        if dob and experience is not None:
            today = date.today()
            age = today.year - dob.year - ((today.month, today.day) < (dob.month, dob.day))
            
            # Experience should be reasonable compared to age
            if experience > (age - 18):
                raise ValidationError({
                    'experience': 'Experience cannot exceed the time since turning 18.',
                    'dob': 'Please verify your date of birth.'
                })
        
        # Validate that required fields are present
        
        required_fields = ['full_name', 'gender']
        missing_fields = []
        
        for field in required_fields:
            if not cleaned_data.get(field):
                missing_fields.append(field.replace('_', ' ').title())
        
        if missing_fields:
            raise ValidationError(f'Please fill in all required fields: {", ".join(missing_fields)}.')
        
        return cleaned_data
    
    def save(self, commit=True):
        # Save the doctor instance
        doctor = super().save(commit=False)
        
        # CRITICAL: File fields must be handled explicitly when using commit=False
        # Get the profile_picture from cleaned_data (already validated in clean method)
        if 'profile_picture' in self.cleaned_data:
            profile_picture = self.cleaned_data['profile_picture']
            # Set the file field if it exists (None means keep existing, File means new upload)
            doctor.profile_picture = profile_picture
        
        if commit:
            # Save the instance - this saves the file to disk
            doctor.save()
            
            # Update the email in the related User model
            if hasattr(doctor, 'user') and doctor.user:
                email = self.cleaned_data.get('email')
                if email and doctor.user.email != email:
                    doctor.user.email = email
                doctor.user.save()
        
        return doctor

class DoctorAdminForm(forms.ModelForm):
    # Add user field for admin form
    user = forms.ModelChoiceField(
        queryset=None,  # Will be set in __init__
        required=True,
        help_text="Select an existing user or create a new one"
    )
    
    class Meta:
        model = Doctor
        fields = '__all__'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Set queryset to only include users with role='doctor'
        from care.models import CustomUser
        if 'user' in self.fields:
            self.fields['user'].queryset = CustomUser.objects.filter(role='doctor')
            
            # If editing existing doctor, make user field read-only
            if self.instance.pk:
                self.fields['user'].widget.attrs['readonly'] = True
                self.fields['user'].help_text = "User cannot be changed after creation"
