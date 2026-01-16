from rest_framework import serializers
from .models import Syllabus, SyllabusSubject


class SyllabusSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = SyllabusSubject
        fields = ["id", "subject_name", "marks"]


class SyllabusSerializer(serializers.ModelSerializer):
    subjects = SyllabusSubjectSerializer(many=True, read_only=True)
    program_name = serializers.CharField(
        source="program.title",
        read_only=True
    )

    class Meta:
        model = Syllabus
        fields = [
            "id",
            "title",
            "slug",
            "program",
            "program_name",
            "featured_image",
            "featured_image_url",
            "university",
            "total_questions",
            "total_marks",
            "pass_marks",
            "negative_marking",
            "negative_mark_value",
            "question_type",
            "exam_duration",
            "top_description",
            "main_description",
            "subjects",
            "is_featured",
            "is_published",
            "created_at",
        ]
