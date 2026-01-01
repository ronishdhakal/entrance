from rest_framework import generics
from .models import CollegeInquiry, ProgramInquiry
from .serializers import (
    CollegeInquirySerializer,
    ProgramInquirySerializer,
)


class CollegeInquiryCreateView(generics.CreateAPIView):
    queryset = CollegeInquiry.objects.all()
    serializer_class = CollegeInquirySerializer


class ProgramInquiryCreateView(generics.CreateAPIView):
    queryset = ProgramInquiry.objects.all()
    serializer_class = ProgramInquirySerializer
