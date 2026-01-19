from django.db import models
from django.utils.text import slugify
from ckeditor.fields import RichTextField


class Book(models.Model):
    FORMAT_CHOICES = [
        ("paperback", "Paperback"),
        ("hardcover", "Hardcover"),
        ("ebook", "eBook"),
        ("audiobook", "Audiobook"),
    ]

    # ---------- Basic Info ----------
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    subtitle = models.CharField(
        max_length=255,
        blank=True,
        help_text="Optional subtitle"
    )

    genre = models.CharField(
        max_length=100,
        blank=True,
        help_text="Genre or category (e.g. Fiction, Business)"
    )

    # ✅ Rich text editor (like Program model)
    description = RichTextField(
        blank=True,
        help_text="Full book description (supports formatting)"
    )

    excerpt = RichTextField(
        blank=True,
        help_text="Short summary for SEO / preview"
    )

    # ---------- Book Metadata ----------
    author = models.CharField(
        max_length=255,
        default="College Info Nepal",
        help_text="Author name(s)"
    )

    publisher = models.CharField(
        max_length=255,
        default="College Info Nepal",
        help_text="Publisher / Brand"
    )

    isbn_10 = models.CharField(
        max_length=10,
        blank=True,
        null=True,
        unique=True
    )

    isbn_13 = models.CharField(
        max_length=13,
        blank=True,
        null=True,
        unique=True
    )

    language = models.CharField(
        max_length=50,
        default="English"
    )

    page_count = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    publication_date = models.DateField(
        blank=True,
        null=True
    )

    format = models.CharField(
        max_length=20,
        choices=FORMAT_CHOICES,
        default="paperback"
    )

    edition = models.CharField(
        max_length=50,
        blank=True,
        help_text="e.g. First Edition"
    )

    # ---------- Pricing & Stock ----------
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Book price"
    )

    currency = models.CharField(
        max_length=10,
        default="USD"
    )

    in_stock = models.BooleanField(
        default=True,
        help_text="Is the book currently available?"
    )

    buy_now_link = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="External buy now link"
    )

    sku = models.CharField(
        max_length=100,
        blank=True,
        help_text="Internal or vendor SKU"
    )

    # ---------- Ratings ----------
    average_rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0.0
    )

    rating_count = models.PositiveIntegerField(default=0)
    review_count = models.PositiveIntegerField(default=0)

    # ---------- Visibility ----------
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)

    # ---------- Timestamps ----------
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)
            slug = base_slug
            counter = 1

            while Book.objects.filter(slug=slug).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1

            self.slug = slug

        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class BookImage(models.Model):
    book = models.ForeignKey(
        Book,
        related_name="images",
        on_delete=models.CASCADE
    )

    image = models.ImageField(upload_to="books/gallery/")
    alt_text = models.CharField(
        max_length=255,
        blank=True,
        help_text="SEO-friendly alt text"
    )

    is_featured = models.BooleanField(
        default=False,
        help_text="Main product image"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.book.title}"

class BookReview(models.Model):
    book = models.ForeignKey(
        Book,
        related_name="reviews",
        on_delete=models.CASCADE
    )

    reviewer_name = models.CharField(max_length=255)
    rating = models.PositiveSmallIntegerField(
        help_text="Rating from 1 to 5"
    )

    review_text = models.TextField(blank=True)

    is_approved = models.BooleanField(
        default=True,
        help_text="Uncheck to hide review from public"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.rating}⭐ - {self.book.title}"
