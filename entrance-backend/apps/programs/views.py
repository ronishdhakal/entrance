from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Program
from .serializers import ProgramSerializer


class ProgramListView(ListAPIView):
    queryset = Program.objects.filter(is_active=True)
    serializer_class = ProgramSerializer


class ProgramDetailView(RetrieveAPIView):
    queryset = Program.objects.filter(is_active=True)
    serializer_class = ProgramSerializer
    lookup_field = 'slug'
