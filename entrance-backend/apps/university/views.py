from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND

from .models import University
from .serializers import UniversitySerializer


@api_view(['GET'])
def university_list(request):
    universities = University.objects.all()
    serializer = UniversitySerializer(universities, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def university_detail(request, slug):
    try:
        university = University.objects.get(slug=slug)
    except University.DoesNotExist:
        return Response(
            {'detail': 'University not found'},
            status=HTTP_404_NOT_FOUND
        )

    serializer = UniversitySerializer(university)
    return Response(serializer.data)
