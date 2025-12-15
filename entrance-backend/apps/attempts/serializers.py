from rest_framework import serializers

from .models import ExamAttempt, UserAnswer
from apps.mocktests.models import MockTest, Section, Question, Option


# =========================
# START ATTEMPT
# =========================
class StartAttemptSerializer(serializers.Serializer):
    mock_test_id = serializers.IntegerField()
    selected_optional_sections = serializers.ListField(
        child=serializers.IntegerField(),
        required=False
    )


# =========================
# ANSWER SUBMISSION
# =========================
class AnswerSerializer(serializers.Serializer):
    question_id = serializers.IntegerField()
    option_id = serializers.IntegerField()


# =========================
# RESULT (AFTER SUBMIT)
# =========================
class AttemptResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamAttempt
        fields = (
            "id",
            "score",
            "status",
            "started_at",
            "submitted_at",
        )


# =========================
# QUESTIONS FLOW SERIALIZERS
# =========================
class AttemptOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = (
            "id",
            "option_text",
        )


class AttemptQuestionSerializer(serializers.ModelSerializer):
    options = AttemptOptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = (
            "id",
            "question_text",
            "marks",
            "negative_marks",
            "options",
        )


class AttemptSectionSerializer(serializers.ModelSerializer):
    questions = AttemptQuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = (
            "id",
            "title",
            "is_optional",
            "optional_group",
            "questions",
        )


# =========================
# ATTEMPT HISTORY (LIST)
# =========================
class AttemptHistorySerializer(serializers.ModelSerializer):
    mock_test_title = serializers.CharField(
        source="mock_test.title",
        read_only=True
    )
    program = serializers.CharField(
        source="mock_test.program.abbreviation",
        read_only=True
    )

    class Meta:
        model = ExamAttempt
        fields = (
            "id",
            "mock_test_title",
            "program",
            "status",
            "score",
            "started_at",
            "submitted_at",
        )


# =========================
# ATTEMPT DETAIL RESULT
# =========================
class AttemptDetailResultSerializer(serializers.ModelSerializer):
    mock_test_title = serializers.CharField(
        source="mock_test.title",
        read_only=True
    )
    program = serializers.CharField(
        source="mock_test.program.title",
        read_only=True
    )

    class Meta:
        model = ExamAttempt
        fields = (
            "id",
            "mock_test_title",
            "program",
            "status",
            "score",
            "started_at",
            "submitted_at",
        )
