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
        'preparing_for',
        'is_active',
        'is_staff',
    )
    list_filter = ('is_active', 'is_staff', 'preparing_for')
    search_fields = ('email', 'full_name')

    # Fields shown while editing a user
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {
            'fields': (
                'full_name',
                'phone',
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

    # Fields shown while creating a user (Add User page)
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email',
                'full_name',
                'phone',
                'preparing_for',
                'password1',
                'password2',
                'is_staff',
                'is_superuser',
            ),
        }),
    )

    readonly_fields = ('date_joined', 'last_login')
