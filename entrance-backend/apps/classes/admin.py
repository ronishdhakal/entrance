from django.contrib import admin
from .models import Class


@admin.register(Class)
class ClassAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "program",
        "university",
        "is_online_available",
        "is_physical_available",
        "priority",
        "is_active",
    )
    list_filter = (
        "is_active",
        "is_online_available",
        "is_physical_available",
        "program",
    )
    search_fields = ("title", "university")
    prepopulated_fields = {"slug": ("title",)}
    ordering = ("priority", "-created_at")

    fieldsets = (
        ("Basic Info", {
            "fields": (
                "title",
                "slug",
                "program",
                "university",
                "is_active",
                "priority",
            )
        }),
        ("Featured Image", {
            "fields": (
                "featured_image",
                "featured_image_url",
            )
        }),
        ("Online Classes", {
            "fields": (
                "is_online_available",
                "online_original_fee",
                "online_discounted_fee",
                "online_location",
            )
        }),
        ("Physical Classes", {
            "fields": (
                "is_physical_available",
                "physical_original_fee",
                "physical_discounted_fee",
                "physical_location",
            )
        }),
        ("Descriptions", {
            "fields": (
                "top_description",
                "bottom_description",
                "highlights",
            )
        }),
        ("Entrance Resources", {
            "fields": (
                "entrance_book_link",
                "entrance_syllabus_link",
                "mock_test_link",
                "entrance_exam_update_link",
            )
        }),
        ("SEO", {
            "fields": (
                "meta_title",
                "meta_description",
            )
        }),
        ("Additional Info", {
            "fields": (
                "duration",
                "batch_start_date",
            )
        }),
    )
