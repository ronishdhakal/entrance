from django.urls import path
from .views import SyllabusListAPIView, SyllabusDetailAPIView

urlpatterns = [
    path("", SyllabusListAPIView.as_view(), name="syllabus-list"),
    path("<slug:slug>/", SyllabusDetailAPIView.as_view(), name="syllabus-detail"),
]
