from rest_framework import serializers
from .models import Result, QuestionResponse

class QuestionResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionResponse
        fields = [
            'id', 'question_text', 'student_answer', 'correct_answer', 
            'is_correct', 'points_earned', 'time_spent_seconds'
        ]

class ResultSerializer(serializers.ModelSerializer):
    question_responses = QuestionResponseSerializer(many=True, read_only=True)
    student_email = serializers.ReadOnlyField(source='test_attempt.student.email')
    test_title = serializers.ReadOnlyField(source='test_attempt.test.title')
    accuracy_percentage = serializers.ReadOnlyField()
    score_percentage = serializers.ReadOnlyField()
    
    class Meta:
        model = Result
        fields = [
            'id', 'test_attempt', 'total_questions', 'correct_answers', 
            'incorrect_answers', 'unanswered_questions', 'time_taken_minutes',
            'created_at', 'question_responses', 'student_email', 'test_title',
            'accuracy_percentage', 'score_percentage'
        ]
        read_only_fields = ['created_at']

class ResultCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = [
            'test_attempt', 'total_questions', 'correct_answers', 
            'incorrect_answers', 'unanswered_questions', 'time_taken_minutes'
        ]
