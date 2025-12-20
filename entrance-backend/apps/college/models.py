from django.db import models
from apps.course.models import Course
from apps.university.models import University


class College(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    courses = models.ManyToManyField(
        Course,
        blank=True,
        related_name='colleges'
    )

    university = models.ForeignKey(
        University,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='colleges'
    )

    priority = models.PositiveIntegerField(default=999)

    cover = models.URLField(
        blank=True,
        help_text="Cover image URL"
    )
    logo = models.URLField(
        blank=True,
        help_text="Logo image URL"
    )

    location = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=30, blank=True)
    website = models.URLField(blank=True)

    description = models.TextField(blank=True)

    external_link = models.URLField(
        blank=True,
        help_text="External detail page link"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['priority', 'title']

    def __str__(self):
        return self.title
