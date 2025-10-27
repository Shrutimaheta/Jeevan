from django import forms
from .models import Nurse
from care.models import CustomUser

class NurseAdminForm(forms.ModelForm):
    class Meta:
        model = Nurse
        exclude = ['password']  # Only exclude password if present
    
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
                if CustomUser.objects.filter(email=user.email).exclude(id=user.id).exists():
                    raise forms.ValidationError("A user with this email already exists.")
            
            # Check if contact_number is unique across all users
            if hasattr(user, 'contact_number') and user.contact_number:
                if CustomUser.objects.filter(contact_number=user.contact_number).exclude(id=user.id).exists():
                    raise forms.ValidationError("A user with this contact number already exists.")
        
        return cleaned_data

# Form is correct, no changes needed.