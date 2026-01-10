from rest_framework.generics import ListAPIView
from .models import Advertisement, FeaturedAd
from .serializers import AdvertisementSerializer, FeaturedAdSerializer


class AdvertisementListView(ListAPIView):
    """
    Public API:
    - Lists active advertisements
    - Optional filter by placement
      /advertisements/?placement=home_1
    """
    serializer_class = AdvertisementSerializer

    def get_queryset(self):
        queryset = Advertisement.objects.filter(is_active=True)

        placement = self.request.query_params.get("placement")
        if placement:
            queryset = queryset.filter(placement=placement)

        return queryset


class FeaturedAdListView(ListAPIView):
    """
    Public API:
    - Returns active featured ads
    - Typically frontend will use the latest one
    """
    serializer_class = FeaturedAdSerializer

    def get_queryset(self):
        return FeaturedAd.objects.filter(is_active=True)
