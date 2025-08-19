from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'questions', views.QuestionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('list/', views.question_list, name='question-list'),
    path('create/', views.create_question, name='create-question'),
]