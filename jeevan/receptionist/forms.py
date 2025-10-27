from django import forms
from .models import Receptionist

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
    """Form for receptionist profile editing"""
    email = forms.EmailField(required=False, widget=forms.EmailInput(attrs={'class': 'form-control'}))
    full_name = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    contact_number = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control'}))
    gender = forms.ChoiceField(choices=Receptionist.GENDER_CHOICES, widget=forms.Select(attrs={'class': 'form-control'}))
    dob = forms.DateField(required=False, widget=forms.DateInput(attrs={'class': 'form-control', 'type': 'date'}))
    address = forms.CharField(required=False, widget=forms.Textarea(attrs={'class': 'form-control', 'rows': 3}))
    qualification = forms.CharField(required=False, widget=forms.TextInput(attrs={'class': 'form-control'}))
    experience = forms.IntegerField(required=False, widget=forms.NumberInput(attrs={'class': 'form-control', 'min': '0'}))
    profile_picture = forms.ImageField(required=False, widget=forms.FileInput(attrs={'class': 'form-control'}))

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
        # The form will automatically populate from the instance
        # No need to manually set initial values as ModelForm handles this

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email and Receptionist.objects.filter(email=email).exclude(id=self.instance.id).exists():
            raise forms.ValidationError("This email is already in use by another receptionist.")
        return email

    def clean_contact_number(self):
        contact_number = self.cleaned_data.get('contact_number')
        if contact_number and Receptionist.objects.filter(contact_number=contact_number).exclude(id=self.instance.id).exists():
            raise forms.ValidationError("This contact number is already in use by another receptionist.")
        return contact_number

    def clean_experience(self):
        experience = self.cleaned_data.get('experience')
        if experience is not None and experience < 0:
            raise forms.ValidationError("Experience cannot be negative.")
        return experience

    def save(self, commit=True):
        receptionist = super().save(commit=False)
        if commit:
            receptionist.save()
            # Update the user's email if it was changed
            if 'email' in self.cleaned_data and receptionist.user:
                receptionist.user.email = self.cleaned_data['email']
                receptionist.user.save()
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
                if CustomUser.objects.filter(email=user.email).exclude(id=user.id).exists():
                    raise forms.ValidationError("A user with this email already exists.")
            
            # Check if contact_number is unique across all users
            if hasattr(user, 'contact_number') and user.contact_number:
                if CustomUser.objects.filter(contact_number=user.contact_number).exclude(id=user.id).exists():
                    raise forms.ValidationError("A user with this contact number already exists.")
        
        return cleaned_data

class ReceptionistChangePasswordForm(forms.Form):
    """Form for receptionist to change password"""
    current_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Current Password',
            'required': True
        }),
        label='Current Password'
    )
    new_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'New Password',
            'required': True
        }),
        label='New Password',
        min_length=8
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'form-control',
            'placeholder': 'Confirm New Password',
            'required': True
        }),
        label='Confirm New Password'
    )

    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get('new_password')
        confirm_password = cleaned_data.get('confirm_password')

        if new_password and confirm_password:
            if new_password != confirm_password:
                raise forms.ValidationError("New passwords don't match.")
        
        return cleaned_data

    def clean_new_password(self):
        new_password = self.cleaned_data.get('new_password')
        if new_password and len(new_password) < 8:
            raise forms.ValidationError("Password must be at least 8 characters long.")
        return new_password
