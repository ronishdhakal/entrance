from django.urls import path
from .views import (
    CollegeInquiryCreateView,
    ProgramInquiryCreateView,
)

urlpatterns = [
    path("college/", CollegeInquiryCreateView.as_view(), name="college-inquiry"),
    path("program/", ProgramInquiryCreateView.as_view(), name="program-inquiry"),
]
