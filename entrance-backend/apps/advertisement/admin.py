from django.contrib import admin
from .models import Advertisement, FeaturedAd


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


@admin.register(FeaturedAd)
class FeaturedAdAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "is_active",
        "created_at",
    )
    list_filter = ("is_active",)
    search_fields = ("title",)
    ordering = ("-created_at",)

    fieldsets = (
        ("Basic Info", {
            "fields": ("title", "is_active")
        }),
        ("First Featured Ad", {
            "fields": (
                "ad_one_text",
                "ad_one_url",
            )
        }),
        ("Second Featured Ad", {
            "fields": (
                "ad_two_text",
                "ad_two_url",
            )
        }),
    )
