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


# ==========================
# NEW: Featured Ads (Text + Link)
# ==========================
class FeaturedAd(models.Model):
    title = models.CharField(
        max_length=200,
        help_text="Internal title for admin reference"
    )

    # First featured ad
    ad_one_text = models.CharField(
        max_length=255,
        help_text="Text for first featured ad"
    )
    ad_one_url = models.URLField(
        help_text="Redirect URL for first featured ad"
    )

    # Second featured ad
    ad_two_text = models.CharField(
        max_length=255,
        help_text="Text for second featured ad"
    )
    ad_two_url = models.URLField(
        help_text="Redirect URL for second featured ad"
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Featured Advertisement"
        verbose_name_plural = "Featured Advertisements"

    def __str__(self):
        return self.title
