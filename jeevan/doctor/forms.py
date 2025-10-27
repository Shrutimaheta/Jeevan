from django import forms
from .models import AppointmentPrescription, Doctor
from care.models import CustomUser, Hospital, Specialization
from datetime import date

class AppointmentPrescriptionForm(forms.ModelForm):
    class Meta:
        model = AppointmentPrescription
        fields = [
            'diagnosis', 'medications', 'tests_recommended', 'advice', 'follow_up_date'
        ]
        widgets = {
            'diagnosis': forms.Textarea(attrs={'rows':3, 'class':'form-control'}),
            'medications': forms.Textarea(attrs={'rows':5, 'class':'form-control', 'placeholder':'Drug Name - Dose - Frequency - Duration'}),
            'tests_recommended': forms.Textarea(attrs={'rows':3, 'class':'form-control'}),
            'advice': forms.Textarea(attrs={'rows':3, 'class':'form-control'}),
            'follow_up_date': forms.DateInput(attrs={'type':'date', 'class':'form-control'}),
        }

class DoctorProfileForm(forms.ModelForm):
    class Meta:
        model = Doctor
        fields = ['full_name', 'gender', 'hospital', 'specialization']
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Full Name'
            }),
            'gender': forms.Select(attrs={
                'class': 'form-control'
            }),
            'hospital': forms.Select(attrs={
                'class': 'form-control'
            }),
            # Removed specialization widget to use default horizontal filter
        }

class DoctorAdminForm(forms.ModelForm):
    contact_number = forms.CharField(
        required=False,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter contact number'
        })
    )
    email = forms.EmailField(
        required=False,
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Enter email address'
        })
    )
    
    class Meta:
        model = Doctor
        exclude = ['password']  # Only exclude password
        widgets = {
            'full_name': forms.TextInput(attrs={'class': 'form-control'}),
            'gender': forms.Select(attrs={'class': 'form-control'}),
            'hospital': forms.Select(attrs={'class': 'form-control'}),
            'dob': forms.DateInput(attrs={'type': 'date', 'class': 'form-control', 'min': '1955-01-01', 'max': '2003-01-01'}),
            'registration_number': forms.TextInput(attrs={'class': 'form-control'}),
            'experience': forms.NumberInput(attrs={'class': 'form-control', 'min': '0'}),
            'qualification': forms.TextInput(attrs={'class': 'form-control'}),
            'address': forms.Textarea(attrs={'class': 'form-control', 'rows': 3}),
            'profile_picture': forms.FileInput(attrs={'class': 'form-control'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'form-check-input'}),
        }
    
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
        
        # Auto-populate contact_number and email from linked user if available
        if self.instance and getattr(self.instance, 'user_id', None):
            user = CustomUser.objects.filter(pk=self.instance.user_id).only('contact_number', 'email').first()
            if user:
                self.fields['contact_number'].initial = user.contact_number
                self.fields['email'].initial = user.email

        # Ensure dob widget has min/max on every init (in case widgets overwritten)
        if 'dob' in self.fields:
            self.fields['dob'].widget.attrs.setdefault('min', '1955-01-01')
            self.fields['dob'].widget.attrs.setdefault('max', '2003-01-01')
    
    def clean_full_name(self):
        # Auto-populate full_name from user if user is selected
        user = self.cleaned_data.get('user')
        if user and hasattr(user, 'full_name'):
            return user.full_name
        return self.cleaned_data.get('full_name')
    
    def clean(self):
        cleaned_data = super().clean()
        user = cleaned_data.get('user')
        contact_number = cleaned_data.get('contact_number')
        email = cleaned_data.get('email')
        
        if user:
            # Check if email is unique across all users
            if email:
                if CustomUser.objects.filter(email=email).exclude(id=user.id).exists():
                    raise forms.ValidationError("A user with this email already exists.")
            
            # Check if contact_number is unique across all users
            if contact_number:
                if CustomUser.objects.filter(contact_number=contact_number).exclude(id=user.id).exists():
                    raise forms.ValidationError("A user with this contact number already exists.")
        
        return cleaned_data

    def clean_dob(self):
        dob = self.cleaned_data.get('dob')
        if dob is None:
            return dob
        min_dob = date(1955, 1, 1)
        max_dob = date(2003, 1, 1)
        if dob < min_dob:
            raise forms.ValidationError("Date of Birth cannot be earlier than 1955-01-01 (Age ≤ 70).")
        if dob > max_dob:
            raise forms.ValidationError("Date of Birth cannot be later than 2003-01-01 (Age ≥ 22).")
        return dob
    
    def save(self, commit=True):
        doctor = super().save(commit=False)
        contact_number = self.cleaned_data.get('contact_number')
        email = self.cleaned_data.get('email')
        print(f"DEBUG: Saving doctor {doctor.full_name} with contact number: '{contact_number}', email: '{email}'")
        
        if commit:
            doctor.save()
            # Update the user's contact number and email if they were changed
            if doctor.user:
                # Always update contact_number and email, even if empty
                print(f"DEBUG: Updating user {doctor.user.username} contact from '{doctor.user.contact_number}' to '{contact_number or ''}' and email from '{doctor.user.email}' to '{email or ''}'")
                doctor.user.contact_number = contact_number or ''
                doctor.user.email = email or ''
                doctor.user.save()
                # Force a fresh query from database
                from care.models import CustomUser
                fresh_user = CustomUser.objects.get(id=doctor.user.id)
                print(f"DEBUG: After save, fresh user contact is: '{fresh_user.contact_number}', email is: '{fresh_user.email}'")
        
        return doctor