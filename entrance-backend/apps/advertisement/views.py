from rest_framework.generics import ListAPIView
from .models import Advertisement
from .serializers import AdvertisementSerializer


class AdvertisementListView(ListAPIView):
    serializer_class = AdvertisementSerializer

    def get_queryset(self):
        queryset = Advertisement.objects.filter(is_active=True)

        placement = self.request.query_params.get("placement")
        if placement:
            queryset = queryset.filter(placement=placement)

        return queryset
