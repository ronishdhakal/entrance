from django.contrib import admin
from .models import CollegeInquiry, ProgramInquiry


@admin.register(CollegeInquiry)
class CollegeInquiryAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "phone",
        "college",
        "course",
        "created_at",
    )
    list_filter = ("college", "course", "created_at")
    search_fields = ("full_name", "phone", "email")


@admin.register(ProgramInquiry)
class ProgramInquiryAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "phone",
        "program",
        "created_at",
    )
    list_filter = ("program", "created_at")
    search_fields = ("full_name", "phone", "email")
