# Configuration file for the test platform
# Copy this to .env and update values as needed

import os

# Django Settings
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-change-this-in-production')
DEBUG = os.environ.get('DEBUG', 'True').lower() == 'true'
ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

# Database
DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///db.sqlite3')

# Email (for development)
EMAIL_BACKEND = os.environ.get('EMAIL_BACKEND', 'django.core.mail.backends.console.EmailBackend')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'noreply@testplatform.com')

# JWT Settings
JWT_ACCESS_TOKEN_LIFETIME = int(os.environ.get('JWT_ACCESS_TOKEN_LIFETIME', 60))
JWT_REFRESH_TOKEN_LIFETIME = int(os.environ.get('JWT_REFRESH_TOKEN_LIFETIME', 1440))
