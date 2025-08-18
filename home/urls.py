from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from django.db import connection

User = get_user_model()

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


def debug_db(_request):
	try:
		# Test database connection
		with connection.cursor() as cursor:
			cursor.execute("SELECT 1")

		user_count = User.objects.count()
		users = list(User.objects.values('id', 'email', 'username', 'role'))
		
		# Test authentication for test user
		from django.contrib.auth import authenticate
		test_auth = authenticate(email='test@example.com', password='testpass123')
		auth_status = "SUCCESS" if test_auth else "FAILED"
		
		return JsonResponse({
			"message": "Database status",
			"user_count": user_count,
			"users": users,
			"database_configured": True,
			"connection_test": "OK",
			"test_user_auth": auth_status,
			"test_user_exists": User.objects.filter(email='test@example.com').exists()
		})
	except Exception as e:
		return JsonResponse({
			"message": "Database error",
			"error": str(e),
			"database_configured": False,
			"connection_test": "FAILED"
		}, status=500)


urlpatterns = [
	path('api-auth/', include('rest_framework.urls')),
	path('api/users/', include('users.urls')),
	path('api/questions/', include('questions.urls')),
	path('api/results/', include('results.urls')),
	path('admin/', admin.site.urls),
	path('debug/', debug_db),
	path('test/', test_auth),
	path('', health),
]
