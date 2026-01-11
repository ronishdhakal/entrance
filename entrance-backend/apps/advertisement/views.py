from rest_framework.generics import ListAPIView
from .models import Advertisement, TextAd
from .serializers import AdvertisementSerializer, TextAdSerializer


class AdvertisementListView(ListAPIView):
    serializer_class = AdvertisementSerializer

    def get_queryset(self):
        queryset = Advertisement.objects.filter(is_active=True)

        placement = self.request.query_params.get("placement")
        if placement:
            queryset = queryset.filter(placement=placement)

        return queryset


# ✅ Text Ad View (returns active text ads)
class TextAdListView(ListAPIView):
    serializer_class = TextAdSerializer

    def get_queryset(self):
        return TextAd.objects.filter(is_active=True)
