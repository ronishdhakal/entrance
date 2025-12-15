from django.urls import path
from .views import MockTestListView, MockTestDetailView

urlpatterns = [
    path('', MockTestListView.as_view(), name='mocktest-list'),
    path('<slug:slug>/', MockTestDetailView.as_view(), name='mocktest-detail'),
]
