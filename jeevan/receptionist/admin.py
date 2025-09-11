from django.contrib import admin
from .models import Receptionist
from .forms import ReceptionistAdminForm

@admin.register(Receptionist)
class ReceptionistAdmin(admin.ModelAdmin):
    form = ReceptionistAdminForm
    list_display = ('id', 'full_name', 'hospital', 'gender', 'contact_number')
    search_fields = ('full_name',)
    list_filter = ('full_name',)
    change_form_template = 'admin/receptionist_change_form.html'

# Admin registration is correct, no changes needed.

