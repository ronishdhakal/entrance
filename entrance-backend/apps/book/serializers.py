from rest_framework import serializers
from .models import Book, BookImage


class BookImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookImage
        fields = (
            "id",
            "image",
            "alt_text",
        )


class BookSerializer(serializers.ModelSerializer):
    images = BookImageSerializer(many=True, read_only=True)

    class Meta:
        model = Book
        fields = (
            "id",
            "title",
            "slug",
            "brand",
            "price",
            "buy_now_link",
            "description",
            "is_active",
            "images",
            "created_at",
        )
