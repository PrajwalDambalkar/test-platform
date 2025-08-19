from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'results', views.ResultViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('list/', views.result_list, name='result-list'),
    path('create/', views.create_result, name='create-result'),
]