from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ('email',)
    list_display = (
        'email',
        'full_name',
        'phone',
        'address',   # ✅ added
        'preparing_for',
        'is_active',
        'is_staff',
    )
    list_filter = ('is_active', 'is_staff', 'preparing_for')
    search_fields = ('email', 'full_name', 'phone', 'address')

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {
            'fields': (
                'full_name',
                'phone',
                'address',   # ✅ added
                'preparing_for',
            )
        }),
        (_('Permissions'), {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'groups',
                'user_permissions',
            )
        }),
        (_('Important dates'), {
            'fields': ('last_login', 'date_joined')
        }),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'full_name',
                'phone',
                'address',   # ✅ added
                'preparing_for',
                'password1',
                'password2',
                'is_staff',
                'is_superuser',
            ),
        }),
    )

    readonly_fields = ('date_joined', 'last_login')
