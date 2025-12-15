from rest_framework import serializers
from .models import MockTest, Section, Question, Option


# =========================
# OPTION
# =========================
class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = (
            "id",
            "option_text",
        )
        read_only_fields = fields


# =========================
# QUESTION
# =========================
class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = (
            "id",
            "question_text",
            "marks",
            "negative_marks",
            "options",
        )
        read_only_fields = fields


# =========================
# SECTION
# =========================
class SectionSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Section
        fields = (
            "id",
            "title",
            "is_optional",
            "optional_group",
            "questions",
        )
        read_only_fields = fields


# =========================
# MOCK TEST (DETAIL)
# =========================
class MockTestSerializer(serializers.ModelSerializer):
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = MockTest
        fields = (
            "id",          # ✅ REQUIRED for starting attempts
            "title",
            "slug",
            "duration",
            "instructions",
            "sections",
        )
        read_only_fields = fields
