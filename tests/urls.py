from django.urls import path
from . import views

app_name = 'tests'

urlpatterns = [
    # Placeholder - we'll add real endpoints later
    path('', views.test_list, name='test_list'),
]