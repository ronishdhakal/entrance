from django.contrib import admin
from .models import ExamAttempt, UserAnswer


@admin.register(ExamAttempt)
class ExamAttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'mock_test', 'status', 'score', 'started_at')
    list_filter = ('status', 'mock_test')
    search_fields = ('user__email',)


@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('attempt', 'question', 'selected_option', 'is_correct')
    search_fields = ('attempt__user__email',)
