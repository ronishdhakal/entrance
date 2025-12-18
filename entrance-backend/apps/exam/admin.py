from django.contrib import admin
from .models import Exam


@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'institute_name',
        'exam_date',
        'opens_at',
        'closes_at',
        'is_active',
    )
    list_filter = ('is_active', 'exam_date', 'institute_name')
    search_fields = ('title', 'institute_name')
    prepopulated_fields = {"slug": ("title",)}
    ordering = ('-opens_at',)
