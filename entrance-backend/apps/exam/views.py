from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Exam
from .serializers import ExamSerializer


@api_view(['GET'])
def exam_list(request):
    exams = Exam.objects.filter(is_active=True)
    serializer = ExamSerializer(exams, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def exam_detail(request, slug):
    try:
        exam = Exam.objects.get(slug=slug, is_active=True)
    except Exam.DoesNotExist:
        return Response(
            {"detail": "Exam not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ExamSerializer(exam)
    return Response(serializer.data)
