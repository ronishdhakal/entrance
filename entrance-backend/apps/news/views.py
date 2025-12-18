from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import News
from .serializers import NewsSerializer


@api_view(["GET"])
def news_list(request):
    news = News.objects.filter(is_active=True)
    serializer = NewsSerializer(news, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def news_detail(request, slug):
    try:
        news = News.objects.get(slug=slug, is_active=True)
    except News.DoesNotExist:
        return Response(
            {"detail": "News not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = NewsSerializer(news)
    return Response(serializer.data)
