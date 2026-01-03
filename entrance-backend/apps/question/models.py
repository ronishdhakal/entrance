from django.db import models
from apps.programs.models import Program


class Section(models.Model):
    program = models.ForeignKey(
        Program,
        on_delete=models.CASCADE,
        related_name="question_sections"
    )
    title = models.CharField(max_length=100)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("program", "title")
        ordering = ["order"]

    def __str__(self):
        return f"{self.program.abbreviation} - {self.title}"


class Topic(models.Model):
    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name="topics"
    )
    title = models.CharField(max_length=100)

    class Meta:
        unique_together = ("section", "title")

    def __str__(self):
        return f"{self.section.title} → {self.title}"


class SubTopic(models.Model):
    topic = models.ForeignKey(
        Topic,
        on_delete=models.CASCADE,
        related_name="subtopics"
    )
    title = models.CharField(max_length=100)

    class Meta:
        unique_together = ("topic", "title")

    def __str__(self):
        return f"{self.topic.title} → {self.title}"


class Question(models.Model):
    program = models.ForeignKey(
        Program,
        on_delete=models.CASCADE,
        related_name="questions"
    )
    section = models.ForeignKey(
        Section,
        on_delete=models.CASCADE,
        related_name="questions"
    )
    topic = models.ForeignKey(
        Topic,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="questions"
    )
    sub_topic = models.ForeignKey(
        SubTopic,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="questions"
    )

    question_text = models.TextField(help_text="Supports LaTeX and Rich Text")
    marks = models.FloatField(default=1)
    negative_marks = models.FloatField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.program.abbreviation} - {self.section.title} Question"


class Option(models.Model):
    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE,
        related_name="options"
    )
    option_text = models.TextField(help_text="Supports LaTeX")
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return f"Option for Question {self.question_id}"
