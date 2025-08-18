'''Use this for production'''

from .base import *
import os
import dj_database_url
from datetime import timedelta

DEBUG = False
ALLOWED_HOSTS = ['*']  # Configure this properly for production

# Ensure AUTH_USER_MODEL is set (inherited from base)
# AUTH_USER_MODEL = 'users.User'  # This should come from base.py

# Minimal INSTALLED_APPS for production - only essential packages
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'users',
    'tests',
    'questions',
    'results',
]

# Database: use DATABASE_URL if provided; otherwise fall back to SQLite (ephemeral)
_database_url = os.environ.get('DATABASE_URL')
if _database_url:
    DATABASES = {
        'default': dj_database_url.config(
            default=_database_url,
            conn_max_age=600,
            ssl_require=False,  # Internal Render connections do not require SSL
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        }
    }

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static'),
]

# Security
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True

# CORS settings for production
CORS_ALLOWED_ORIGINS = [
    "https://test-platform-navy.vercel.app",  # Your Vercel domain
    "http://localhost:3000",  # For local development
]

# JWT settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'JTI_CLAIM': 'jti',
    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}

# Auto-create test user after migrations
def create_test_user(sender, **kwargs):
    """Create a test user after migrations complete"""
    try:
        from django.contrib.auth import get_user_model
        from django.contrib.auth import authenticate
        
        User = get_user_model()
        
        if not User.objects.filter(email='test@example.com').exists():
            user = User.objects.create_user(
                username='testuser',
                email='test@example.com',
                password='testpass123',
                first_name='Test',
                last_name='User',
                role='STUDENT'
            )
            print(f"Created test user: {user.email}")
            
            # Test password authentication immediately
            test_auth = authenticate(email='test@example.com', password='testpass123')
            if test_auth:
                print(f"✅ Password authentication test PASSED for {user.email}")
            else:
                print(f"❌ Password authentication test FAILED for {user.email}")
                # Try to debug the issue
                print(f"User exists: {User.objects.filter(email='test@example.com').exists()}")
                print(f"User is_active: {user.is_active}")
                print(f"User password hash: {user.password[:50]}...")
                
        else:
            user = User.objects.get(email='test@example.com')
            print(f"Test user already exists: {user.email}")
            
            # Test password authentication for existing user
            test_auth = authenticate(email='test@example.com', password='testpass123')
            if test_auth:
                print(f"✅ Password authentication test PASSED for existing user {user.email}")
            else:
                print(f"❌ Password authentication test FAILED for existing user {user.email}")
                # Try to debug the issue
                print(f"User is_active: {user.is_active}")
                print(f"User password hash: {user.password[:50]}...")
                
    except Exception as e:
        print(f"Error creating test user: {e}")
        import traceback
        traceback.print_exc()

# Connect the signal
from django.db.models.signals import post_migrate
post_migrate.connect(create_test_user, sender=None)
