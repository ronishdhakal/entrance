from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField

# Assuming Program model already exists
from apps.programs.models import Program


class Class(models.Model):
    # -----------------------------
    # Core Information
    # -----------------------------
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    program = models.ForeignKey(
        Program,
        on_delete=models.CASCADE,
        related_name="classes"
    )

    university = models.CharField(
        max_length=255,
        help_text="University name (text-based for flexibility)"
    )

    # -----------------------------
    # Featured Image (Upload OR URL)
    # -----------------------------
    featured_image = models.ImageField(
        upload_to="classes/featured/",
        blank=True,
        null=True
    )
    featured_image_url = models.URLField(
        blank=True,
        null=True,
        help_text="Use if image is hosted externally"
    )

    # -----------------------------
    # Online Classes
    # -----------------------------
    is_online_available = models.BooleanField(default=False)
    online_original_fee = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    online_discounted_fee = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    online_location = models.CharField(
        max_length=255,
        blank=True,
        help_text="Zoom, Google Meet, Microsoft Teams, etc."
    )

    # -----------------------------
    # Physical Classes
    # -----------------------------
    is_physical_available = models.BooleanField(default=False)
    physical_original_fee = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    physical_discounted_fee = models.DecimalField(
        max_digits=10, decimal_places=2, blank=True, null=True
    )
    physical_location = models.CharField(
        max_length=255,
        blank=True,
        help_text="Location where physical classes will run"
    )

    # -----------------------------
    # Descriptions (Rich Text)
    # -----------------------------
    top_description = RichTextField(
        blank=True,
        help_text="Main rich text content (CKEditor)"
    )
    bottom_description = RichTextField(
        blank=True,
        help_text="Additional rich text content"
    )

    # -----------------------------
    # Useful Entrance Resources
    # -----------------------------
    entrance_book_link = models.URLField(blank=True)
    entrance_syllabus_link = models.URLField(blank=True)
    mock_test_link = models.URLField(
        blank=True,
        help_text="Mock test & practice questions link"
    )
    entrance_exam_update_link = models.URLField(blank=True)

    # -----------------------------
    # Page Enhancement Fields
    # -----------------------------
    highlights = RichTextField(
        blank=True,
        help_text="Key highlights / bullet points (rich text)"
    )
    duration = models.CharField(
        max_length=100,
        blank=True,
        help_text="e.g. 3 Months, 6 Weeks"
    )
    batch_start_date = models.DateField(blank=True, null=True)

    # -----------------------------
    # Status & SEO
    # -----------------------------
    is_active = models.BooleanField(default=True)
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = RichTextField(
        blank=True,
        help_text="SEO description (rich text)"
    )

    # -----------------------------
    # Ordering & Timestamp
    # -----------------------------
    priority = models.PositiveIntegerField(
        default=1,
        help_text="Lower number = higher priority"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # -----------------------------
    # Slug Handling
    # -----------------------------
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    # -----------------------------
    # Admin Representation
    # -----------------------------
    def __str__(self):
        return self.title

    class Meta:
        ordering = ["priority", "-created_at"]
        verbose_name = "Class"
        verbose_name_plural = "Classes"
