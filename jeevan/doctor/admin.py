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

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    form = DoctorAdminForm
    # Columns displayed in the admin list view
    list_display = ('id', 'full_name', 'contact_number', 'hospital', 'get_specializations', 'gender')
    
    # Fields to search
    search_fields = ('full_name', 'contact_number')
    
    # Sidebar filters
    list_filter = ('hospital', 'specialization', 'gender')
    
    # For ManyToMany fields, use horizontal filter widget
    filter_horizontal = ('specialization',)

    # Custom method to show ManyToMany field in list_display
    def get_specializations(self, obj):
        return ", ".join([s.Sname for s in obj.specialization.all()])
    get_specializations.short_description = 'Specializations'
