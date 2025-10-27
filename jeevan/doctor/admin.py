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
from .models import Doctor
from .forms import DoctorAdminForm
from django.urls import reverse
from django.utils.html import format_html

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    form = DoctorAdminForm
    # Columns displayed in the admin list view
    list_display = ('id', 'full_name', 'hospital', 'get_specializations', 'gender', 'contact_number', 'email', 'registration_number', 'qualification', 'experience', 'is_active')
    
    # Fields to search
    search_fields = ('full_name', 'registration_number', 'qualification')
    
    # Sidebar filters
    list_filter = ('hospital', 'specialization', 'gender', 'qualification', 'is_active', 'created_at')
    
    # For ManyToMany fields, use horizontal filter widget
    filter_horizontal = ('specialization',)
    
    # Fieldsets for better organization
    fieldsets = (
        ('Basic Information', {
            'fields': ('user', 'hospital', 'full_name', 'gender', 'dob', 'contact_number', 'email')
        }),
        ('Professional Information', {
            'fields': ('registration_number', 'qualification', 'experience', 'specialization')
        }),
        ('Contact & Profile', {
            'fields': ('address', 'profile_picture')
        }),
        ('Status & Timestamps', {
            'fields': ('is_active', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    # Make some fields read-only
    readonly_fields = ('created_at', 'updated_at')

    class Media:
        js = (
            'admin/js/vendor/jquery/jquery.min.js',
            'js/doctor_admin_autofill.js',
        )

        # Inline script to auto-fill fields based on selected user
        def render(self):
            pass

    def get_fieldsets(self, request, obj=None):
        # On add view, only show essential registration fields
        if obj is None:
            return (
                (None, {
                    'fields': (
                        'user',
                        'hospital',
                        'full_name',
                        'gender',
                        'dob',
                        'contact_number',
                        'email',
                        'specialization',
                    )
                }),
            )
        # On change view, show full fieldsets
        return super().get_fieldsets(request, obj)

    # Custom method to show ManyToMany field in list_display
    def get_specializations(self, obj):
        return ", ".join([s.sname for s in obj.specialization.all()])
    get_specializations.short_description = 'Specializations'
    
    # Custom method to display contact number from linked user
    def contact_number(self, obj):
        """Display contact number from linked user"""
        if obj.user:
            # Force a fresh query from database to get latest data
            from care.models import CustomUser
            try:
                fresh_user = CustomUser.objects.get(id=obj.user.id)
                contact_num = fresh_user.contact_number
                print(f"DEBUG: Doctor {obj.full_name} - User: {fresh_user.username}, Contact: '{contact_num}'")
                return contact_num or '-'
            except CustomUser.DoesNotExist:
                print(f"DEBUG: Doctor {obj.full_name} - User not found")
                return '-'
        print(f"DEBUG: Doctor {obj.full_name} - No user")
        return '-'
    contact_number.short_description = 'Contact Number'
    
    # Custom method to display email from linked user
    def email(self, obj):
        """Display email from linked user"""
        if obj.user:
            # Force a fresh query from database to get latest data
            from care.models import CustomUser
            try:
                fresh_user = CustomUser.objects.get(id=obj.user.id)
                return fresh_user.email or '-'
            except CustomUser.DoesNotExist:
                return '-'
        return '-'
    email.short_description = 'Email'
