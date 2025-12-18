from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField


class Exam(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)

    institute_name = models.CharField(max_length=255)

    cover_photo = models.ImageField(
        upload_to="exam/covers/",
        blank=True,
        null=True
    )

    # ✅ Rich text fields
    top_description = RichTextField(blank=True)
    detail = RichTextField(blank=True)

    link = models.URLField(blank=True)

    exam_date = models.DateField()
    exam_time = models.TimeField()

    form_fee = models.CharField(max_length=50, blank=True)
    double_fee = models.CharField(max_length=50, blank=True)

    opens_at = models.DateField()
    closes_at = models.DateField()

    full_mark = models.CharField(max_length=50, blank=True)
    pass_mark = models.CharField(max_length=50, blank=True)

    question_type = models.CharField(max_length=100, blank=True)
    number_of_questions = models.PositiveIntegerField()
    duration = models.CharField(max_length=50, blank=True)

    negative_marking = models.CharField(max_length=100, blank=True)

    meta_title = models.CharField(max_length=255, blank=True)

    # ✅ Rich text (SEO description)
    meta_description = RichTextField(blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-opens_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
