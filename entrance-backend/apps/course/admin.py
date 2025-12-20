from django.contrib import admin
from .models import Course


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'abbreviation', 'slug')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'abbreviation')
