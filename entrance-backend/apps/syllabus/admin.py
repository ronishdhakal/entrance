from django.contrib import admin
from .models import Syllabus, SyllabusSubject


class SyllabusSubjectInline(admin.TabularInline):
    model = SyllabusSubject
    extra = 1


@admin.register(Syllabus)
class SyllabusAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "program",
        "university",
        "total_marks",
        "is_published",
        "is_featured",
    )
    list_filter = ("program", "is_published", "is_featured")
    search_fields = ("title", "university")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [SyllabusSubjectInline]
