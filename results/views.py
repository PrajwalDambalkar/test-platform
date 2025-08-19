from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Result, QuestionResponse
from .serializers import ResultSerializer, QuestionResponseSerializer

class ResultViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing results
    """
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Result.objects.all()
        return Result.objects.filter(test_attempt__student=user)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def result_list(request):
    """List results for the authenticated user"""
    user = request.user
    if user.is_staff:
        results = Result.objects.all()
    else:
        results = Result.objects.filter(test_attempt__student=user)
    
    serializer = ResultSerializer(results, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_result(request):
    """Create a new test result"""
    serializer = ResultSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)