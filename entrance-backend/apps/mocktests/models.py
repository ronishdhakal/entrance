from django.db import models
from apps.programs.models import Program


class MockTest(models.Model):
    program = models.ForeignKey(
        Program,
        on_delete=models.CASCADE,
        related_name='mock_tests'
    )
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    duration = models.PositiveIntegerField(help_text="Duration in minutes")
    instructions = models.TextField(blank=True)
    is_published = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.program.abbreviation} - {self.title}"


class Section(models.Model):
    mock_test = models.ForeignKey(
        MockTest,
        on_delete=models.CASCADE,
        related_name='sections'
    )
    title = models.CharField(max_length=100)
    order = models.PositiveIntegerField()
    total_questions = models.PositiveIntegerField()

    is_optional = models.BooleanField(default=False)
    optional_group = models.PositiveIntegerField(
        blank=True,
        null=True,
        help_text="Same number = one optional group"
    )

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"{self.mock_test.title} - {self.title}"


class Question(models.Model):
    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name='questions'
    )
    question_text = models.TextField(help_text="Supports LaTeX")
    marks = models.FloatField(default=1)
    negative_marks = models.FloatField(default=0)
    order = models.PositiveIntegerField()

    def __str__(self):
        return f"Q{self.order} - {self.section.title}"


class Option(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name='options'
    )
    option_text = models.TextField(help_text="Supports LaTeX")
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"Option for Q{self.question.id}"
