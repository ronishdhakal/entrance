from django.urls import path
from .views import ClassListAPIView, ClassDetailAPIView

urlpatterns = [
    path("", ClassListAPIView.as_view(), name="class-list"),
    path("<slug:slug>/", ClassDetailAPIView.as_view(), name="class-detail"),
]
