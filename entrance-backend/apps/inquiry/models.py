from django.db import models
from apps.college.models import College
from apps.course.models import Course
from apps.programs.models import Program


class CollegeInquiry(models.Model):
    # Student info
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)

    # What student is inquiring about
    college = models.ForeignKey(
        College,
        on_delete=models.CASCADE,
        related_name="college_inquiries"
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="course_inquiries"
    )

    message = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} → {self.college.title}"


class ProgramInquiry(models.Model):
    # Student info
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True)

    # Program (distinct from Course)
    program = models.ForeignKey(
        Program,
        on_delete=models.CASCADE,
        related_name="program_inquiries"
    )

    message = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.full_name} → {self.program.title}"
