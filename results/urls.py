from django.urls import path
from . import views

app_name = 'results'

urlpatterns = [
    # Placeholder - we'll add real endpoints later
    path('', views.result_list, name='result_list'),
]