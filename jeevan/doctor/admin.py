# from django.contrib import admin
# from .models import Doctor
# from .forms import DoctorAdminForm

# @admin.register(Doctor)
# class DoctorAdmin(admin.ModelAdmin):
#     form = DoctorAdminForm
#     list_display = ('id', 'full_name', 'hospital', 'contact_number')
#     search_fields = ('full_name',)
#     list_filter = ('hospital',)
#     filter_horizontal = ['specialization']

from django.contrib import admin
from django.contrib import messages
from django.shortcuts import redirect
from django.urls import reverse
from .models import Doctor
from .forms import DoctorAdminForm
from care.models import CustomUser

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    form = DoctorAdminForm
    # Columns displayed in the admin list view
    list_display = ('id', 'full_name', 'hospital', 'get_specializations', 'gender', 'registration_number', 'experience', 'user')
    
    # Fields to search
    search_fields = ('full_name', 'registration_number', 'user__username', 'user__email')
    
    # Sidebar filters
    list_filter = ('hospital', 'specialization', 'gender', 'is_active')
    
    # For ManyToMany fields, use horizontal filter widget
    filter_horizontal = ('specialization',)
    
    # Fields to display in the form
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Personal Information', {
            'fields': ('full_name', 'gender', 'dob', 'profile_picture')
        }),
        ('Professional Information', {
            'fields': ('hospital', 'specialization', 'registration_number', 'experience', 'qualification')
        }),
        ('Additional Information', {
            'fields': ('address', 'rating', 'accepts_insurance', 'is_active'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    readonly_fields = ('created_at', 'updated_at')

    # Custom method to show ManyToMany field in list_display
    def get_specializations(self, obj):
        return ", ".join([s.sname for s in obj.specialization.all()])
    get_specializations.short_description = 'Specializations'
    
    def get_readonly_fields(self, request, obj=None):
        # Make user field readonly when editing existing doctor
        if obj:  # editing an existing object
            return self.readonly_fields + ('user',)
        return self.readonly_fields
    
    def save_model(self, request, obj, form, change):
        # If creating a new doctor, ensure the user has role='doctor'
        if not change:  # creating new object
            if obj.user.role != 'doctor':
                messages.error(request, f"Selected user '{obj.user.username}' does not have doctor role. Please select a user with doctor role or create a new doctor user.")
                return
        
        super().save_model(request, obj, form, change)
        
        if not change:
            messages.success(request, f"Doctor '{obj.full_name}' created successfully!")
    
    def add_view(self, request, form_url='', extra_context=None):
        # Check if there are any users with doctor role
        doctor_users = CustomUser.objects.filter(role='doctor')
        if not doctor_users.exists():
            messages.warning(request, 
                "No users with 'doctor' role found. Please create a user with doctor role first. "
                "<a href='{}'>Create Doctor User</a>".format(
                    reverse('admin:care_customuser_add')
                )
            )
        
        return super().add_view(request, form_url, extra_context)
