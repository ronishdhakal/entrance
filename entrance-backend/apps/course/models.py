from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=255)
    sub_heading = models.CharField(max_length=255, blank=True)
    abbreviation = models.CharField(max_length=50, blank=True)
    slug = models.SlugField(unique=True)

    featured_image = models.ImageField(
        upload_to='courses/featured/',
        blank=True,
        null=True
    )

    top_description = models.TextField(blank=True)
    bottom_description = models.TextField(blank=True)

    link = models.URLField(
        blank=True,
        help_text="External detail page link"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title
