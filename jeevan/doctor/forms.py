from django import forms
from .models import AppointmentPrescription

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
from django import forms
from .models import Doctor
from care.models import Hospital, Specialization

class DoctorProfileForm(forms.ModelForm):
    class Meta:
        model = Doctor
        fields = ['full_name', 'contact_number', 'gender', 'hospital', 'specialization']
        widgets = {
            'full_name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Full Name'
            }),
            'contact_number': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Contact Number'
            }),
            'gender': forms.Select(attrs={
                'class': 'form-control'
            }),
            'hospital': forms.Select(attrs={
                'class': 'form-control'
            }),
            'specialization': forms.CheckboxSelectMultiple(attrs={
                'class': 'form-check-input'
            })
        }

class DoctorAdminForm(forms.ModelForm):
    class Meta:
        model = Doctor
        exclude = ['password']  # Only exclude password
