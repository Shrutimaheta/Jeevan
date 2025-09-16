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
