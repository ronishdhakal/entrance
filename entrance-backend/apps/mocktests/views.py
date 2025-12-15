from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import MockTest
from .serializers import MockTestSerializer


class MockTestListView(ListAPIView):
    queryset = MockTest.objects.filter(is_published=True)
    serializer_class = MockTestSerializer


class MockTestDetailView(RetrieveAPIView):
    queryset = MockTest.objects.filter(is_published=True)
    serializer_class = MockTestSerializer
    lookup_field = 'slug'
