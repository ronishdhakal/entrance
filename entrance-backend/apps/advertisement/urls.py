from django.urls import path
from .views import AdvertisementListView, TextAdListView

urlpatterns = [
    path("", AdvertisementListView.as_view(), name="advertisement-list"),
    path("text/", TextAdListView.as_view(), name="text-ad-list"),
]
