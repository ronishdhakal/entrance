from django.db import models
from django.utils.text import slugify


class Book(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)

    brand = models.CharField(
        max_length=255,
        help_text="Publisher / Brand / Author name",
    )

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text="Price of the book",
    )

    buy_now_link = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="External buy now link",
    )

    description = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)

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
        on_delete=models.CASCADE,
    )

    image = models.ImageField(upload_to="books/gallery/")
    alt_text = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Image for {self.book.title}"
