#!/bin/bash

echo "Starting Django deployment..."

# Run migrations first
echo "Running database migrations..."
python manage.py migrate

# Create test user
echo "Creating test user..."
python manage.py create_test_user

# Start the server
echo "Starting Gunicorn server..."
exec gunicorn home.wsgi:application --bind 0.0.0.0:$PORT
