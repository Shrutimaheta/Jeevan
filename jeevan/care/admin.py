from django.contrib import admin
from .models import Hospital, CustomUser, Specialization
from django.contrib.auth.admin import UserAdmin
from django.urls import path
from django.http import JsonResponse

""" class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ('Extra Fields', {'fields': ('role',)}),
    )

    # list_display = UserAdmin.list_display + ('role',)
    list_display = ('username', 'full_name', 'email', 'role', 'is_active')
    list_filter = ('role', 'is_active', 'is_staff')

    def full_name(self, obj):
        return obj.full_name

    full_name.short_description = 'Full Name'  # Optional: sets column name in admin

admin.site.register(CustomUser, CustomUserAdmin)
 """

# from django.contrib.auth.admin import UserAdmin
# from django.contrib import admin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # Remove first_name and last_name from fieldsets
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('full_name', 'email', 'contact_number', 'role')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        # ('Extra Fields', {'fields': ('role',)}),
    )

    # Remove first_name and last_name from add_fieldsets too (when adding new user)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'full_name', 'email', 'contact_number', 'password1', 'password2', 'role'),
        }),
    )

    list_display = ('username', 'full_name', 'email', 'contact_number', 'role', 'is_active')
    search_fields = ('username', 'full_name', 'email', 'contact_number')

admin.site.register(CustomUser, CustomUserAdmin)


@admin.register(Specialization)
class SpecializationAdmin(admin.ModelAdmin):
    list_display = ('sname', 'description', 'icon')
    search_fields = ('sname',)
    list_filter = ('sname',)

@admin.register(Hospital)
class HospitalAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'location', 'email', 'contact_no', 'registration_number')
    search_fields = ('name',)
    list_filter = ('location',)
    filter_horizontal = ['specialization']

# @admin.register(Doctor)
# class DoctorAdmin(admin.ModelAdmin):
#     list_display = ('id', 'full_name','hospital','contact_number')
#     search_fields = ('full_name',)
#     list_filter = ('full_name',)
#     filter_horizontal = ['specialization']
#     change_form_template = 'admin/doctor_change_form.html'

    # def get_urls(self):
    #     urls = super().get_urls()
    #     custom_urls = [
    #         path('get-user-info/<int:user_id>/', self.admin_site.admin_view(self.get_user_info)),
    #     ]
    #     return custom_urls + urls

    # def get_user_info(self, request, user_id):
    #     try:
    #         user = CustomUser.objects.get(id=user_id)
    #         return JsonResponse({
    #             'full_name': user.full_name,
    #             'email': user.email,
    #         })
    #     except CustomUser.DoesNotExist:
    #         return JsonResponse({'error': 'User not found'}, status=404)

# @admin.register(Nurse)
# class  NurseAdmin(admin.ModelAdmin):
#     list_display = ('id', 'full_name','hospital','gender','contact_number')
#     search_fields = ('full_name',)
#     list_filter = ('full_name',)
#     change_form_template = 'admin/nurse_change_form.html'

# @admin.register(Receptionist)
# class  ReceptionistAdmin(admin.ModelAdmin):
#     list_display = ('id', 'full_name','hospital','gender','contact_number')
#     search_fields = ('full_name',)
#     list_filter = ('full_name',)
#     change_form_template = 'admin/receptionist_change_form.html'

# Admin registration is correct, no changes needed.
