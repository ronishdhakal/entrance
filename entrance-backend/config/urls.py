from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),

    # ✅ CKEditor upload URLs (ADD THIS)
    path("ckeditor/", include("ckeditor_uploader.urls")),

    # ✅ API routes
    path("api/auth/", include("apps.accounts.urls")),
    path("api/programs/", include("apps.programs.urls")),
    path("api/mocktests/", include("apps.mocktests.urls")),
    path("api/attempts/", include("apps.attempts.urls")),
    path("api/exam/", include("apps.exam.urls")),
    path("api/news/", include("apps.news.urls")),
    path("api/books/", include("apps.book.urls")),
    path('api/course/', include('apps.course.urls')),
    path('api/college/', include('apps.college.urls')),
    path('api/university/', include('apps.university.urls')),
    path('api/advertisement/', include('apps.advertisement.urls')),
    path("api/inquiry/", include("apps.inquiry.urls")),
    path("api/question/", include("apps.question.urls")),
    path("api/syllabus/", include("apps.syllabus.urls")),








]


# ✅ Serve media files in development
if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
