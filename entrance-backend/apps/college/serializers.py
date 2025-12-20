from rest_framework import serializers
from .models import College


class CollegeSerializer(serializers.ModelSerializer):
    course_titles = serializers.SerializerMethodField()
    university_name = serializers.SerializerMethodField()

    class Meta:
        model = College
        fields = "__all__"

    def get_course_titles(self, obj):
        return list(
            obj.courses.values_list("abbreviation", flat=True)
        )

    def get_university_name(self, obj):
        return obj.university.title if obj.university else None
