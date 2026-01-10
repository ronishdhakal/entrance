from rest_framework import serializers
from .models import Advertisement, FeaturedAd


class AdvertisementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advertisement
        fields = "__all__"


class FeaturedAdSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeaturedAd
        fields = "__all__"
