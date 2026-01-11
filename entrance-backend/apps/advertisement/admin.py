from django.contrib import admin
from .models import Advertisement, TextAd


@admin.register(Advertisement)
class AdvertisementAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "placement",
        "is_active",
        "created_at",
    )
    list_filter = ("placement", "is_active")
    search_fields = ("title",)
    ordering = ("-created_at",)

    fieldsets = (
        ("Basic Info", {
            "fields": ("title", "placement", "is_active")
        }),
        ("Images", {
            "fields": (
                "desktop_image",
                "desktop_image_url",
                "mobile_image",
            )
        }),
        ("Redirect", {
            "fields": ("redirect_url",)
        }),
    )


# ✅ Text Ad Admin (Two Text Ads in One Record)
@admin.register(TextAd)
class TextAdAdmin(admin.ModelAdmin):
    list_display = (
        "is_active",
        "created_at",
    )
    list_filter = ("is_active",)
    ordering = ("-created_at",)

    fieldsets = (
        ("Text Ad 1", {
            "fields": (
                "title_1",
                "description_1",
                "link_1",
            )
        }),
        ("Text Ad 2", {
            "fields": (
                "title_2",
                "description_2",
                "link_2",
            )
        }),
        ("Status", {
            "fields": ("is_active",)
        }),
    )
