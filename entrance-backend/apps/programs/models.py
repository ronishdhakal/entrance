from django.db import models
from ckeditor.fields import RichTextField


class Program(models.Model):
    title = models.CharField(max_length=100)
    abbreviation = models.CharField(max_length=20, unique=True)
    slug = models.SlugField(unique=True)

    # ✅ Rich text editor in admin
    description = RichTextField(blank=True)

    external_link = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title
