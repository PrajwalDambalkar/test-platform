from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def health(_request):
	return JsonResponse({"status": "ok", "service": "django-backend"})


urlpatterns = [
	path('api-auth/', include('rest_framework.urls')),
	path('api/users/', include('users.urls')),
	path('api/questions/', include('questions.urls')),
	path('api/results/', include('results.urls')),
	path('admin/', admin.site.urls),
	path('', health),
]
