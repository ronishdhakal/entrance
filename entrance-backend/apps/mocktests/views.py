from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import MockTest, Section, Question, Option
from .serializers import (
    MockTestSerializer,
    AdminMockTestSerializer,
    AdminSectionSerializer,
    AdminQuestionSerializer,
    AdminOptionSerializer
)


# =========================
# PUBLIC VIEWS (Read-only for students)
# =========================

class MockTestListView(ListAPIView):
    serializer_class = MockTestSerializer

    def get_queryset(self):
        queryset = MockTest.objects.filter(is_published=True)

        # ✅ FILTER BY PROGRAM (IMPORTANT FIX)
        program_id = self.request.query_params.get("program")
        if program_id:
            queryset = queryset.filter(program_id=program_id)

        return queryset


class MockTestDetailView(RetrieveAPIView):
    queryset = MockTest.objects.filter(is_published=True)
    serializer_class = MockTestSerializer
    lookup_field = 'slug'


# =========================
# ADMIN VIEWS (Full CRUD for staff)
# =========================

class IsStaffUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class AdminMockTestViewSet(viewsets.ModelViewSet):
    queryset = MockTest.objects.all()
    serializer_class = AdminMockTestSerializer
    permission_classes = [IsStaffUser]
    lookup_field = 'id'

    @action(detail=False, methods=['get'])
    def stats(self, request):
        total = MockTest.objects.count()
        published = MockTest.objects.filter(is_published=True).count()
        draft = total - published
        return Response({
            'total': total,
            'published': published,
            'draft': draft
        })


class AdminSectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    serializer_class = AdminSectionSerializer
    permission_classes = [IsStaffUser]


class AdminQuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = AdminQuestionSerializer
    permission_classes = [IsStaffUser]


class AdminOptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = AdminOptionSerializer
    permission_classes = [IsStaffUser]
