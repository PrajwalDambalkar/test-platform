from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .models import Question, Choice
from .serializers import QuestionSerializer, ChoiceSerializer

class QuestionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for viewing and editing questions
    """
    queryset = Question.objects.filter(is_active=True)
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        queryset = Question.objects.filter(is_active=True)
        question_type = self.request.query_params.get('type', None)
        if question_type:
            queryset = queryset.filter(question_type=question_type)
        return queryset

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def question_list(request):
    """List all active questions"""
    questions = Question.objects.filter(is_active=True)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_question(request):
    """Create a new question"""
    serializer = QuestionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(created_by=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)