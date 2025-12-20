from django.db import models


class University(models.Model):
    title = models.CharField(max_length=255)
    abbreviation = models.CharField(max_length=50, blank=True)
    slug = models.SlugField(unique=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title
