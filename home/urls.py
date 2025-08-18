from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse


def health(_request):
	return JsonResponse({"status": "ok", "service": "django-backend"})


def test_auth(_request):
	return JsonResponse({
		"message": "Auth endpoints are working",
		"endpoints": {
			"register": "/api/users/register/",
			"login": "/api/users/login/",
			"profile": "/api/users/profile/",
			"logout": "/api/users/logout/"
		}
	})


urlpatterns = [
	path('api-auth/', include('rest_framework.urls')),
	path('api/users/', include('users.urls')),
	path('api/questions/', include('questions.urls')),
	path('api/results/', include('results.urls')),
	path('admin/', admin.site.urls),
	path('test/', test_auth),
	path('', health),
]
