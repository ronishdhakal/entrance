from django.db import models


class Advertisement(models.Model):

    PLACEMENT_CHOICES = [
        ("home_1", "Home 1"),
        ("home_2", "Home 2"),
        ("home_3", "Home 3"),
        ("home_4", "Home 4"),
        ("popup", "Popup"),
    ]

    title = models.CharField(max_length=200)
    placement = models.CharField(
        max_length=20,
        choices=PLACEMENT_CHOICES
    )

    # Desktop image (upload OR external link)
    desktop_image = models.ImageField(
        upload_to="advertisements/desktop/",
        blank=True,
        null=True
    )
    desktop_image_url = models.URLField(
        blank=True,
        null=True
    )

    # Mobile image
    mobile_image = models.ImageField(
        upload_to="advertisements/mobile/",
        blank=True,
        null=True
    )

    redirect_url = models.URLField()
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.get_placement_display()})"


# ✅ TEXT ADS (TWO TEXT BLOCKS IN ONE RECORD)
class TextAd(models.Model):

    # Text Ad 1
    title_1 = models.CharField(max_length=200)
    description_1 = models.TextField()
    link_1 = models.URLField()

    # Text Ad 2
    title_2 = models.CharField(max_length=200)
    description_2 = models.TextField()
    link_2 = models.URLField()

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Text Ads ({self.created_at.date()})"
