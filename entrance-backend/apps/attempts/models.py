from django.conf import settings
from django.db import models
from django.utils import timezone

from apps.mocktests.models import MockTest, Question, Option

User = settings.AUTH_USER_MODEL


class ExamAttempt(models.Model):
    STATUS_CHOICES = [
        ('in_progress', 'In Progress'),
        ('submitted', 'Submitted'),
        ('auto_submitted', 'Auto Submitted'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='exam_attempts'
    )

    mock_test = models.ForeignKey(
        MockTest,
        on_delete=models.CASCADE,
        related_name='attempts'
    )

    selected_optional_sections = models.JSONField(
        blank=True,
        null=True,
        help_text="List of Section IDs selected by the user"
    )

    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(blank=True, null=True)

    score = models.FloatField(default=0)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='in_progress'
    )

    def is_time_over(self):
        return timezone.now() > self.started_at + timezone.timedelta(
            minutes=self.mock_test.duration
        )

    def __str__(self):
        return f"{self.user} - {self.mock_test.title}"


class UserAnswer(models.Model):
    attempt = models.ForeignKey(
        ExamAttempt,
        on_delete=models.CASCADE,
        related_name='answers'
    )

    question = models.ForeignKey(
        Question,
        on_delete=models.CASCADE
    )

    selected_option = models.ForeignKey(
        Option,
        on_delete=models.CASCADE
    )

    is_correct = models.BooleanField(default=False)

    class Meta:
        unique_together = ('attempt', 'question')

    def __str__(self):
        return f"Attempt {self.attempt.id} - Q{self.question.id}"
