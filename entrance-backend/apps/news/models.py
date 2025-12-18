from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField


class News(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)

    featured_image = models.ImageField(
        upload_to="news/featured/",
        blank=True,
        null=True
    )

    # ✅ Rich text editor in Django admin
    description = RichTextField()

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
