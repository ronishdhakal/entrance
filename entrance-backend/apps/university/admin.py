from django.contrib import admin
from .models import University


@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('title', 'abbreviation', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'abbreviation')
