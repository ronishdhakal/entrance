from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Class
from .serializers import ClassListSerializer, ClassDetailSerializer


class ClassListAPIView(ListAPIView):
    queryset = Class.objects.filter(is_active=True).order_by("priority", "-created_at")
    serializer_class = ClassListSerializer


class ClassDetailAPIView(RetrieveAPIView):
    queryset = Class.objects.filter(is_active=True)
    serializer_class = ClassDetailSerializer
    lookup_field = "slug"
