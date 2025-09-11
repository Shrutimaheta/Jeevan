from django import forms
from .models import Nurse

class NurseAdminForm(forms.ModelForm):
    class Meta:
        model = Nurse
        exclude = ['password']  # Only exclude password if present

# Form is correct, no changes needed.