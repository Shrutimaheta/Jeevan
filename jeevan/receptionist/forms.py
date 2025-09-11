from django import forms
from .models import Receptionist  # Update this import to match your app structure

class ReceptionistAdminForm(forms.ModelForm):
    class Meta:
        model = Receptionist
        exclude = ['password']  # Only exclude password if present

# Form is correct, no changes needed.
