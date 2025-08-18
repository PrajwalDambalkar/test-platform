import os

from django.core.wsgi import get_wsgi_application

# Use production settings for deployment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "home.settings.prod")

application = get_wsgi_application()

# Add whitenoise for static files (only if available)
try:
    from whitenoise.django import DjangoWhiteNoise
    application = DjangoWhiteNoise(application)
except ImportError:
    # If whitenoise is not available, continue without it
    pass
