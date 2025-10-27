from django.contrib import admin
from .models import Nurse
from .forms import NurseAdminForm

# Register your models here.
@admin.register(Nurse)
class NurseAdmin(admin.ModelAdmin):
    form = NurseAdminForm
    list_display = ('id', 'full_name', 'hospital', 'gender')
    search_fields = ('full_name',)
    list_filter = ('hospital', 'gender')
    change_form_template = 'admin/nurse_change_form.html'
