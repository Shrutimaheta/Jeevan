from django.contrib import admin
from .models import Patient


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('id', 'full_name', 'email', 'contact_number', 'gender', 'dob', 'city', 'blood_group')
    list_filter = ('gender', 'blood_group', 'city')
    search_fields = ('id', 'full_name', 'email', 'contact_number', 'abha_id')
    readonly_fields = ('id',)
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'user', 'full_name', 'email', 'password')
        }),
        ('Personal Details', {
            'fields': ('contact_number', 'gender', 'dob', 'profile_photo')
        }),
        ('Address Information', {
            'fields': ('address', 'city', 'pincode')
        }),
        ('Health Information', {
            'fields': ('abha_id', 'emergency_number', 'blood_group', 'existing_condition', 'allergies')
        }),
    )
