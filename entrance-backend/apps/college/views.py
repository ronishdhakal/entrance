from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND

from .models import College
from .serializers import CollegeSerializer


@api_view(['GET'])
def college_list(request):
    queryset = College.objects.select_related(
        'university'
    ).prefetch_related(
        'courses'
    )

    course = request.GET.get('course')
    if course:
        queryset = queryset.filter(courses__slug=course)

    university = request.GET.get('university')
    if university:
        queryset = queryset.filter(university__slug=university)

    serializer = CollegeSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def college_detail(request, slug):
    try:
        college = College.objects.select_related(
            'university'
        ).prefetch_related(
            'courses'
        ).get(slug=slug)
    except College.DoesNotExist:
        return Response(
            {'detail': 'College not found'},
            status=HTTP_404_NOT_FOUND
        )

    serializer = CollegeSerializer(college)
    return Response(serializer.data)
