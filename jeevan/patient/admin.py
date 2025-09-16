from django.contrib import admin
from .models import Patient, PatientDocument
from .help_models import FAQ, SupportTicket, SupportMessage, HealthResource, ContactInfo


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


@admin.register(PatientDocument)
class PatientDocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'title', 'document_type', 'file_size', 'uploaded_at')
    list_filter = ('document_type', 'uploaded_at')
    search_fields = ('patient__full_name', 'patient__email', 'title', 'description')
    readonly_fields = ('id', 'uploaded_at', 'updated_at', 'file_size', 'file_extension', 'is_image', 'is_pdf')
    fieldsets = (
        ('Document Information', {
            'fields': ('id', 'patient', 'title', 'document_type', 'description')
        }),
        ('File Details', {
            'fields': ('file', 'file_size', 'file_extension', 'is_image', 'is_pdf')
        }),
        ('Timestamps', {
            'fields': ('uploaded_at', 'updated_at')
        }),
    )


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'is_active', 'order', 'created_at')
    list_filter = ('category', 'is_active', 'created_at')
    search_fields = ('question', 'answer')
    list_editable = ('is_active', 'order')
    ordering = ['order', 'created_at']


@admin.register(SupportTicket)
class SupportTicketAdmin(admin.ModelAdmin):
    list_display = ('id', 'patient', 'subject', 'category', 'status', 'priority', 'created_at')
    list_filter = ('status', 'priority', 'category', 'created_at')
    search_fields = ('subject', 'description', 'patient__full_name', 'patient__email')
    readonly_fields = ('id', 'created_at', 'updated_at', 'resolved_at')
    fieldsets = (
        ('Ticket Information', {
            'fields': ('id', 'patient', 'subject', 'description', 'category')
        }),
        ('Status & Priority', {
            'fields': ('status', 'priority')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'resolved_at')
        }),
    )


@admin.register(SupportMessage)
class SupportMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'ticket', 'sender', 'is_admin_reply', 'created_at')
    list_filter = ('is_admin_reply', 'created_at')
    search_fields = ('message', 'ticket__subject', 'sender__full_name')
    readonly_fields = ('id', 'created_at')


@admin.register(HealthResource)
class HealthResourceAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'is_active', 'order', 'created_at')
    list_filter = ('category', 'is_active', 'created_at')
    search_fields = ('title', 'content')
    list_editable = ('is_active', 'order')
    ordering = ['order', 'created_at']


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ('name', 'department', 'phone', 'email', 'is_emergency', 'is_active', 'order')
    list_filter = ('is_emergency', 'is_active', 'department')
    search_fields = ('name', 'department', 'phone', 'email')
    list_editable = ('is_active', 'order')
    ordering = ['order', 'name']
