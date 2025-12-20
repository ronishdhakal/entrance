from django.contrib import admin
from .models import College


@admin.register(College)
class CollegeAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'get_courses',
        'university',
        'priority',
    )

    list_filter = (
        'university',
    )

    search_fields = (
        'title',
        'location',
    )

    prepopulated_fields = {'slug': ('title',)}

    filter_horizontal = ('courses',)

    def get_courses(self, obj):
        return ", ".join(obj.courses.values_list('abbreviation', flat=True))

    get_courses.short_description = "Courses"
