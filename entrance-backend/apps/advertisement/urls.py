from django.urls import path
from .views import AdvertisementListView, FeaturedAdListView

urlpatterns = [
    # Advertisements (image-based)
    path("", AdvertisementListView.as_view(), name="advertisement-list"),

    # Featured Ads (text + link)
    path("featured/", FeaturedAdListView.as_view(), name="featured-ad-list"),
]
