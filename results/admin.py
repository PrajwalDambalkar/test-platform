from django.contrib import admin
from .models import Result, QuestionResponse

class QuestionResponseInline(admin.TabularInline):
    model = QuestionResponse
    extra = 0
    readonly_fields = ('question_text', 'correct_answer', 'is_correct', 'points_earned')

@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('student_email', 'test_title', 'correct_answers', 'total_questions', 'accuracy_percentage', 'created_at')
    list_filter = ('created_at', 'test_attempt__test__title')
    search_fields = ('test_attempt__student__email', 'test_attempt__test__title')
    ordering = ('-created_at',)
    inlines = [QuestionResponseInline]
    
    fieldsets = (
        ('Test Information', {
            'fields': ('test_attempt', 'total_questions', 'correct_answers', 'incorrect_answers', 'unanswered_questions')
        }),
        ('Performance', {
            'fields': ('time_taken_minutes', 'accuracy_percentage', 'score_percentage')
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('created_at', 'accuracy_percentage', 'score_percentage')
    
    def student_email(self, obj):
        return obj.test_attempt.student.email
    student_email.short_description = 'Student'
    
    def test_title(self, obj):
        return obj.test_attempt.test.title
    test_title.short_description = 'Test'
    
    def accuracy_percentage(self, obj):
        return f"{obj.accuracy_percentage:.1f}%"
    accuracy_percentage.short_description = 'Accuracy'

@admin.register(QuestionResponse)
class QuestionResponseAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'student_answer', 'is_correct', 'points_earned', 'result')
    list_filter = ('is_correct', 'result__test_attempt__test__title')
    search_fields = ('question_text', 'student_answer', 'result__test_attempt__student__email')
    ordering = ('result', 'id')
    
    fieldsets = (
        ('Question Details', {
            'fields': ('result', 'question_text', 'correct_answer')
        }),
        ('Student Response', {
            'fields': ('student_answer', 'is_correct', 'points_earned', 'time_spent_seconds')
        }),
    )
