from django.urls import path
from .views import college_list, college_detail

urlpatterns = [
    path('', college_list, name='college-list'),
    path('<slug:slug>/', college_detail, name='college-detail'),
]
