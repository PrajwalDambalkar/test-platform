from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def test_list(request):
    return Response({"message": "Tests endpoint - coming soon!"})