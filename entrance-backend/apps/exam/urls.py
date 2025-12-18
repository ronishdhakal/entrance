from django.urls import path
from . import views

urlpatterns = [
    path('', views.exam_list, name='exam-list'),
    path('<slug:slug>/', views.exam_detail, name='exam-detail'),
]
