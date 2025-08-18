from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db import IntegrityError

User = get_user_model()

class Command(BaseCommand):
    help = 'Create a test user for development/testing'

    def handle(self, *args, **options):
        try:
            # Check if test user already exists
            if User.objects.filter(email='test@example.com').exists():
                self.stdout.write(
                    self.style.SUCCESS('Test user already exists')
                )
                return

            # Create test user
            user = User.objects.create_user(
                username='testuser',
                email='test@example.com',
                password='testpass123',
                first_name='Test',
                last_name='User',
                role='STUDENT'
            )
            
            self.stdout.write(
                self.style.SUCCESS(f'Successfully created test user: {user.email}')
            )
            self.stdout.write(
                self.style.WARNING('Login credentials: test@example.com / testpass123')
            )
            
        except IntegrityError as e:
            self.stdout.write(
                self.style.ERROR(f'Error creating test user: {e}')
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(f'Unexpected error: {e}')
            )
