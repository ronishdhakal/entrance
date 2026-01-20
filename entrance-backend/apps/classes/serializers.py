from rest_framework import serializers
from .models import Class


class ClassListSerializer(serializers.ModelSerializer):
    program_title = serializers.CharField(source="program.title", read_only=True)

    class Meta:
        model = Class
        fields = [
            "id",
            "title",
            "slug",
            "program",
            "program_title",
            "university",
            "featured_image",
            "featured_image_url",
            "is_online_available",
            "is_physical_available",
            "online_discounted_fee",
            "physical_discounted_fee",
            "priority",
        ]


class ClassDetailSerializer(serializers.ModelSerializer):
    program_title = serializers.CharField(source="program.title", read_only=True)

    class Meta:
        model = Class
        fields = "__all__"
