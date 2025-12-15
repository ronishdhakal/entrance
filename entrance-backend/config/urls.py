from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.accounts.urls')),
    path('api/programs/', include('apps.programs.urls')),
    path('api/mocktests/', include('apps.mocktests.urls')),
    path('api/attempts/', include('apps.attempts.urls')),


]
