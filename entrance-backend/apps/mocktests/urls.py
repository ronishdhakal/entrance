from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MockTestListView, 
    MockTestDetailView,
    AdminMockTestViewSet,
    AdminSectionViewSet,
    AdminQuestionViewSet,
    AdminOptionViewSet
)

# Admin router
admin_router = DefaultRouter()
admin_router.register(r'mocktests', AdminMockTestViewSet, basename='admin-mocktest')
admin_router.register(r'sections', AdminSectionViewSet, basename='admin-section')
admin_router.register(r'questions', AdminQuestionViewSet, basename='admin-question')
admin_router.register(r'options', AdminOptionViewSet, basename='admin-option')

urlpatterns = [
    # Public endpoints (read-only for students)
    path('', MockTestListView.as_view(), name='mocktest-list'),
    path('<slug:slug>/', MockTestDetailView.as_view(), name='mocktest-detail'),
    
    # Admin endpoints (full CRUD for staff)
    path('admin/', include(admin_router.urls)),
]
