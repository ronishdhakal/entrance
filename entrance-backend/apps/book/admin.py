from django.contrib import admin
from .models import Book, BookImage


class BookImageInline(admin.TabularInline):
    model = BookImage
    extra = 1


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "brand",
        "price",
        "is_active",
        "created_at",
    )
    list_filter = ("is_active", "brand")
    search_fields = ("title", "brand")
    prepopulated_fields = {"slug": ("title",)}
    inlines = [BookImageInline]


@admin.register(BookImage)
class BookImageAdmin(admin.ModelAdmin):
    list_display = ("book", "created_at")
