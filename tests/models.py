from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()

class Test(models.Model):
    """
    Model for storing test information
    """
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='created_tests')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    duration_minutes = models.PositiveIntegerField(default=60)
    passing_score = models.PositiveIntegerField(default=70)
    max_attempts = models.PositiveIntegerField(default=1)
    
    # Test settings
    shuffle_questions = models.BooleanField(default=False)
    show_results_immediately = models.BooleanField(default=False)
    allow_review = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.title
    
    @property
    def total_questions(self):
        return self.questions.count()
    
    @property
    def total_points(self):
        return sum(question.points for question in self.questions.all())

class TestAttempt(models.Model):
    """
    Model for storing student test attempts
    """
    student = models.ForeignKey(User, on_delete=models.CASCADE, related_name='test_attempts')
    test = models.ForeignKey(Test, on_delete=models.CASCADE, related_name='attempts')
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    is_passed = models.BooleanField(null=True, blank=True)
    
    class Meta:
        unique_together = ['student', 'test']
        ordering = ['-started_at']
    
    def __str__(self):
        return f"{self.student.email} - {self.test.title}"
    
    @property
    def duration_taken(self):
        if self.completed_at:
            return (self.completed_at - self.started_at).total_seconds() / 60
        return None
    
    @property
    def percentage_score(self):
        if self.score is not None:
            return (self.score / self.test.total_points) * 100
        return None
