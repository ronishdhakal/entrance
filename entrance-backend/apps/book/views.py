from rest_framework import generics
from .models import Book
from .serializers import BookSerializer


class BookListAPIView(generics.ListAPIView):
    """
    Public API
    GET /api/books/
    """
    serializer_class = BookSerializer

    def get_queryset(self):
        return (
            Book.objects
            .filter(is_active=True)
            .prefetch_related("images")
            .order_by("-created_at")
        )


class BookDetailAPIView(generics.RetrieveAPIView):
    """
    Public API
    GET /api/books/<slug>/
    """
    serializer_class = BookSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return (
            Book.objects
            .filter(is_active=True)
            .prefetch_related("images")
        )
