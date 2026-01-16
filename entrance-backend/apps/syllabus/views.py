from rest_framework import generics
from .models import Syllabus
from .serializers import SyllabusSerializer


class SyllabusListAPIView(generics.ListAPIView):
    queryset = Syllabus.objects.filter(is_published=True)
    serializer_class = SyllabusSerializer


class SyllabusDetailAPIView(generics.RetrieveAPIView):
    queryset = Syllabus.objects.filter(is_published=True)
    serializer_class = SyllabusSerializer
    lookup_field = "slug"
