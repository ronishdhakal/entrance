from rest_framework import serializers
from .models import CollegeInquiry, ProgramInquiry


class CollegeInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = CollegeInquiry
        fields = "__all__"


class ProgramInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramInquiry
        fields = "__all__"
