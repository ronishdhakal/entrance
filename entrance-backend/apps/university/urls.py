from django.urls import path
from .views import university_list, university_detail

urlpatterns = [
    path('', university_list, name='university-list'),
    path('<slug:slug>/', university_detail, name='university-detail'),
]
