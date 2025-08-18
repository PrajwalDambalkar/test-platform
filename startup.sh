#!/bin/bash

echo "=== Starting Django deployment ==="
echo "Current directory: $(pwd)"
echo "Python version: $(python --version)"
echo "Django version: $(python -c 'import django; print(django.get_version())')"

# Check if manage.py exists
if [ ! -f "manage.py" ]; then
    echo "❌ ERROR: manage.py not found!"
    ls -la
    exit 1
fi

# Check database connection
echo "=== Testing database connection ==="
python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'home.settings.prod')
django.setup()
from django.db import connection
try:
    with connection.cursor() as cursor:
        cursor.execute('SELECT 1')
    print('✅ Database connection successful')
except Exception as e:
    print(f'❌ Database connection failed: {e}')
    exit(1)
"

# Run migrations with verbose output
echo "=== Running database migrations ==="
python manage.py migrate --verbosity=2

# Check if migrations were successful
if [ $? -eq 0 ]; then
    echo "✅ Migrations completed successfully"
    
    # List all tables to verify
    echo "=== Checking database tables ==="
    python -c "
import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'home.settings.prod')
django.setup()
from django.db import connection
with connection.cursor() as cursor:
    cursor.execute(\"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'\")
    tables = [row[0] for row in cursor.fetchall()]
    print(f'Available tables: {tables}')
    if 'users_user' in tables:
        print('✅ users_user table exists')
    else:
        print('❌ users_user table missing')
    "
    
    # Create test user
    echo "=== Creating test user ==="
    python manage.py create_test_user
    
else
    echo "❌ Migrations failed!"
    exit 1
fi

# Start the server
echo "=== Starting Gunicorn server ==="
exec gunicorn home.wsgi:application --bind 0.0.0.0:$PORT
