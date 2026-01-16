from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField

from apps.programs.models import Program


class Syllabus(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, blank=True)

    program = models.ForeignKey(
        Program,
        on_delete=models.CASCADE,
        related_name="syllabi"
    )

    # Featured image (upload OR URL)
    featured_image = models.ImageField(
        upload_to="syllabus/",
        blank=True,
        null=True
    )
    featured_image_url = models.URLField(blank=True, null=True)

    university = models.CharField(max_length=255)

    total_questions = models.PositiveIntegerField()
    total_marks = models.PositiveIntegerField()
    pass_marks = models.PositiveIntegerField()

    negative_marking = models.BooleanField(default=False)
    negative_mark_value = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        blank=True,
        null=True
    )

    question_type = models.CharField(
        max_length=255,
        help_text="MCQ, Subjective, Mixed etc."
    )

    exam_duration = models.PositiveIntegerField(
        help_text="Duration in minutes",
        blank=True,
        null=True
    )

    # ✅ Rich text fields (CKEditor)
    top_description = RichTextField(blank=True)
    main_description = RichTextField()

    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)

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


class SyllabusSubject(models.Model):
    syllabus = models.ForeignKey(
        Syllabus,
        on_delete=models.CASCADE,
        related_name="subjects"
    )
    subject_name = models.CharField(max_length=100)
    marks = models.PositiveIntegerField()

    class Meta:
        unique_together = ("syllabus", "subject_name")

    def __str__(self):
        return f"{self.subject_name} ({self.marks})"
