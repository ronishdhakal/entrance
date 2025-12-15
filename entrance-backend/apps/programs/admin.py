from django.contrib import admin
from .models import Program


@admin.register(Program)
class ProgramAdmin(admin.ModelAdmin):
    list_display = ('title', 'abbreviation', 'is_active')
    search_fields = ('title', 'abbreviation', 'description')
    prepopulated_fields = {'slug': ('title',)}
    list_filter = ('is_active',)
