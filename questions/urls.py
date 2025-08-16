from django.urls import path
from . import views

app_name = 'questions'

urlpatterns = [
    # Placeholder - we'll add real endpoints later
    path('', views.question_list, name='question_list'),
]