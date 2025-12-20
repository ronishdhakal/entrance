from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND

from .models import Course
from .serializers import CourseSerializer


@api_view(['GET'])
def course_list(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def course_detail(request, slug):
    try:
        course = Course.objects.get(slug=slug)
    except Course.DoesNotExist:
        return Response({'detail': 'Course not found'}, status=HTTP_404_NOT_FOUND)

    serializer = CourseSerializer(course)
    return Response(serializer.data)
