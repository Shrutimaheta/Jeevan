from django.contrib import admin
from .models import Receptionist

# Register your models here.
@admin.register(Receptionist)
class ReceptionistAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'hospital', 'full_name', 'email', 'contact_number', 'gender', 'qualification', 'experience', 'is_active']
    list_filter = ['hospital', 'gender', 'is_active', 'qualification']
    search_fields = ['full_name', 'email', 'contact_number', 'qualification']
    readonly_fields = ['id']
    fieldsets = (
        ('Basic Information', {
            'fields': ('id', 'user', 'hospital', 'full_name', 'email', 'contact_number', 'gender')
        }),
        ('Personal Details', {
            'fields': ('dob', 'address', 'profile_picture')
        }),
        ('Professional Details', {
            'fields': ('qualification', 'experience')
        }),
        ('Account Status', {
            'fields': ('is_active',)
        }),
    )
    

