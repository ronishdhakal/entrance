from django.contrib import admin
from .models import Book, BookImage, BookReview


# ---------- Book Images Inline ----------
class BookImageInline(admin.TabularInline):
    model = BookImage
    extra = 1
    fields = ("image", "alt_text", "is_featured")
    readonly_fields = ("created_at",)


# ---------- Book Reviews Inline ----------
class BookReviewInline(admin.TabularInline):
    model = BookReview
    extra = 1
    fields = (
        "reviewer_name",
        "rating",
        "review_text",
        "is_approved",
        "created_at",
    )
    readonly_fields = ("created_at",)


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "author",
        "publisher",
        "genre",
        "price",
        "in_stock",
        "average_rating",
        "is_active",
        "created_at",
    )

    list_filter = (
        "is_active",
        "in_stock",
        "genre",
        "format",
        "language",
        "publisher",
    )

    search_fields = (
        "title",
        "subtitle",
        "author",
        "publisher",
        "isbn_10",
        "isbn_13",
        "genre",
    )

    prepopulated_fields = {"slug": ("title",)}

    readonly_fields = (
        "average_rating",
        "rating_count",
        "review_count",
        "created_at",
        "updated_at",
    )

    fieldsets = (
        ("Basic Information", {
            "fields": (
                "title",
                "subtitle",
                "slug",
                "genre",
                "description",
                "excerpt",
            )
        }),
        ("Book Details", {
            "fields": (
                "author",
                "publisher",
                "isbn_10",
                "isbn_13",
                "language",
                "page_count",
                "publication_date",
                "format",
                "edition",
            )
        }),
        ("Pricing & Availability", {
            "fields": (
                "price",
                "currency",
                "in_stock",
                "buy_now_link",
                "sku",
            )
        }),
        ("Ratings (Auto Calculated)", {
            "fields": (
                "average_rating",
                "rating_count",
                "review_count",
            )
        }),
        ("Visibility", {
            "fields": (
                "is_active",
                "is_featured",
            )
        }),
        ("Timestamps", {
            "fields": (
                "created_at",
                "updated_at",
            )
        }),
    )

    # ✅ Images + Reviews both editable inside Book
    inlines = [BookImageInline, BookReviewInline]

    ordering = ("-created_at",)


# ---------- Book Image Admin ----------
@admin.register(BookImage)
class BookImageAdmin(admin.ModelAdmin):
    list_display = (
        "book",
        "is_featured",
        "created_at",
    )
    list_filter = ("is_featured",)
    search_fields = ("book__title",)
    readonly_fields = ("created_at",)


# ---------- Book Review Admin (Separate Page) ----------
@admin.register(BookReview)
class BookReviewAdmin(admin.ModelAdmin):
    list_display = (
        "book",
        "reviewer_name",
        "rating",
        "is_approved",
        "created_at",
    )

    list_filter = (
        "is_approved",
        "rating",
    )

    search_fields = (
        "book__title",
        "reviewer_name",
        "review_text",
    )

    readonly_fields = ("created_at",)
