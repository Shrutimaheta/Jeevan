from django.contrib import admin
from .models import Appointment

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ['id', 'abha_id', 'patient', 'doctor', 'hospital', 'appointment_date', 'appointment_time', 'status', 'payment_mode', 'created_at']
    list_filter = ['status', 'payment_mode', 'appointment_date', 'created_at', 'hospital']
    search_fields = ['patient__full_name', 'doctor__full_name', 'hospital__name', 'abha_id', 'id']
    list_per_page = 20
    date_hierarchy = 'appointment_date'
    ordering = ['-created_at']
    
    fieldsets = (
        ('Appointment Information', {
            'fields': ('id', 'abha_id', 'patient', 'hospital', 'doctor')
        }),
        ('Schedule', {
            'fields': ('appointment_date', 'appointment_time')
        }),
        ('Details', {
            'fields': ('symptoms', 'payment_mode', 'status')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        })
    )
    
    readonly_fields = ['id', 'abha_id', 'created_at', 'updated_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('patient', 'doctor', 'hospital')
