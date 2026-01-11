from rest_framework import serializers
from .models import Advertisement, TextAd


class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = "__all__"


class TextAdSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextAd
        fields = "__all__"
