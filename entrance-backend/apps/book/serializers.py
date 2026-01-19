from rest_framework import serializers
from .models import Book, BookImage, BookReview


class BookImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookImage
        fields = (
            "id",
            "image",
            "alt_text",
            "is_featured",
        )


class BookReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookReview
        fields = (
            "id",
            "reviewer_name",
            "rating",
            "review_text",
            "created_at",
        )


class BookSerializer(serializers.ModelSerializer):
    images = BookImageSerializer(many=True, read_only=True)

    # ✅ Only approved reviews exposed publicly
    reviews = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = (
            # ---------- Identity ----------
            "id",
            "title",
            "slug",
            "subtitle",
            "genre",

            # ---------- Content ----------
            "description",
            "excerpt",

            # ---------- Book Metadata ----------
            "author",
            "publisher",
            "isbn_10",
            "isbn_13",
            "language",
            "page_count",
            "publication_date",
            "format",
            "edition",

            # ---------- Pricing & Stock ----------
            "price",
            "currency",
            "in_stock",
            "buy_now_link",
            "sku",

            # ---------- Ratings ----------
            "average_rating",
            "rating_count",
            "review_count",

            # ---------- Visibility ----------
            "is_active",
            "is_featured",

            # ---------- Relations ----------
            "images",
            "reviews",

            # ---------- Timestamps ----------
            "created_at",
            "updated_at",
        )

    def get_reviews(self, obj):
        approved_reviews = obj.reviews.filter(is_approved=True)
        return BookReviewSerializer(approved_reviews, many=True).data
