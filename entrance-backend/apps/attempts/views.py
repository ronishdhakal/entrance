from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db import models

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from apps.mocktests.models import MockTest, Section, Question, Option

from .models import ExamAttempt, UserAnswer
from .serializers import (
    StartAttemptSerializer,
    AnswerSerializer,
    AttemptResultSerializer,
    AttemptSectionSerializer,
    AttemptHistorySerializer,
    AttemptDetailResultSerializer,
)


# =========================
# START ATTEMPT
# =========================
class StartAttemptView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = StartAttemptSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        mock_test = get_object_or_404(
            MockTest,
            id=serializer.validated_data["mock_test_id"],
            is_published=True,
        )

        existing_attempt = ExamAttempt.objects.filter(
            user=request.user,
            mock_test=mock_test,
            status="in_progress",
        ).first()

        if existing_attempt:
            return Response(
                {
                    "attempt_id": existing_attempt.id,
                    "duration": mock_test.duration,
                    "resumed": True,
                },
                status=status.HTTP_200_OK,
            )


        attempt = ExamAttempt.objects.create(
            user=request.user,
            mock_test=mock_test,
            selected_optional_sections=serializer.validated_data.get(
                "selected_optional_sections", []
            ),
        )

        return Response(
            {
                "attempt_id": attempt.id,
                "duration": mock_test.duration,
            },
            status=status.HTTP_201_CREATED,
        )


# =========================
# SUBMIT ANSWER
# =========================
class SubmitAnswerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, attempt_id):
        attempt = get_object_or_404(
            ExamAttempt,
            id=attempt_id,
            user=request.user,
            status="in_progress",
        )

        if attempt.is_time_over():
            attempt.status = "auto_submitted"
            attempt.submitted_at = timezone.now()
            attempt.save()
            return Response(
                {"detail": "Time over. Exam auto-submitted."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = AnswerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        question = get_object_or_404(
            Question,
            id=serializer.validated_data["question_id"],
        )

        option = get_object_or_404(
            Option,
            id=serializer.validated_data["option_id"],
            question=question,
        )

        UserAnswer.objects.update_or_create(
            attempt=attempt,
            question=question,
            defaults={
                "selected_option": option,
                "is_correct": option.is_correct,
            },
        )

        return Response({"detail": "Answer saved successfully"})


# =========================
# SUBMIT EXAM
# =========================
class SubmitExamView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, attempt_id):
        attempt = get_object_or_404(
            ExamAttempt,
            id=attempt_id,
            user=request.user,
            status="in_progress",
        )

        total_score = 0

        for ans in attempt.answers.select_related("question"):
            if ans.is_correct:
                total_score += ans.question.marks
            else:
                total_score -= ans.question.negative_marks

        attempt.score = total_score
        attempt.status = "submitted"
        attempt.submitted_at = timezone.now()
        attempt.save()

        serializer = AttemptResultSerializer(attempt)
        return Response(serializer.data)


# =========================
# FETCH ATTEMPT QUESTIONS
# =========================
class AttemptQuestionsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, attempt_id):
        attempt = get_object_or_404(
            ExamAttempt,
            id=attempt_id,
            user=request.user,
            status="in_progress",
        )

        if attempt.is_time_over():
            attempt.status = "auto_submitted"
            attempt.submitted_at = timezone.now()
            attempt.save()
            return Response(
                {"detail": "Time over. Exam auto-submitted."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        sections = Section.objects.filter(
            mock_test=attempt.mock_test
        ).prefetch_related("questions__options")

        # Handle optional sections
        if attempt.selected_optional_sections:
            sections = sections.filter(
                models.Q(is_optional=False)
                | models.Q(id__in=attempt.selected_optional_sections)
            )

        serializer = AttemptSectionSerializer(sections, many=True)

        # IMPORTANT: frontend expects { sections: [...] }
        return Response(
            {"sections": serializer.data},
            status=status.HTTP_200_OK,
        )


# =========================
# ATTEMPT HISTORY
# =========================
class AttemptHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        attempts = ExamAttempt.objects.filter(
            user=request.user
        ).order_by("-started_at")

        serializer = AttemptHistorySerializer(attempts, many=True)
        return Response(serializer.data)


# =========================
# ATTEMPT RESULT DETAIL
# =========================
class AttemptResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, attempt_id):
        attempt = get_object_or_404(
            ExamAttempt,
            id=attempt_id,
            user=request.user,
        )

        serializer = AttemptDetailResultSerializer(attempt)
        return Response(serializer.data)
