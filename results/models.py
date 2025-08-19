from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from tests.models import Test, TestAttempt

User = get_user_model()

class Result(models.Model):
    """
    Model for storing detailed test results
    """
    test_attempt = models.OneToOneField(TestAttempt, on_delete=models.CASCADE, related_name='detailed_result')
    total_questions = models.PositiveIntegerField()
    correct_answers = models.PositiveIntegerField()
    incorrect_answers = models.PositiveIntegerField()
    unanswered_questions = models.PositiveIntegerField(default=0)
    time_taken_minutes = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.test_attempt.student.email} - {self.test_attempt.test.title}"
    
    @property
    def accuracy_percentage(self):
        if self.total_questions > 0:
            return (self.correct_answers / self.total_questions) * 100
        return 0
    
    @property
    def score_percentage(self):
        if self.test_attempt.score is not None and self.test_attempt.test.total_points > 0:
            return (self.test_attempt.score / self.test_attempt.test.total_points) * 100
        return 0

class QuestionResponse(models.Model):
    """
    Model for storing individual question responses
    """
    result = models.ForeignKey(Result, on_delete=models.CASCADE, related_name='question_responses')
    question_text = models.TextField()  # Store question text at time of test
    student_answer = models.TextField(blank=True)
    correct_answer = models.TextField(blank=True)
    is_correct = models.BooleanField()
    points_earned = models.PositiveIntegerField(default=0)
    time_spent_seconds = models.PositiveIntegerField(null=True, blank=True)
    
    class Meta:
        ordering = ['id']
    
    def __str__(self):
        return f"{self.result.test_attempt.student.email} - Q{self.id}"
