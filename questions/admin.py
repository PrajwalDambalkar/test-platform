from django.contrib import admin
from .models import Question, Choice

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 4

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('text', 'question_type', 'points', 'created_by', 'is_active', 'created_at')
    list_filter = ('question_type', 'is_active', 'created_at')
    search_fields = ('text', 'created_by__email')
    ordering = ('-created_at',)
    inlines = [ChoiceInline]
    
    fieldsets = (
        (None, {
            'fields': ('text', 'question_type', 'points', 'is_active')
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at')
    
    def save_model(self, request, obj, form, change):
        if not change:  # Only set created_by for new questions
            obj.created_by = request.user
        super().save_model(request, obj, form, change)

@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('text', 'question', 'is_correct', 'order')
    list_filter = ('is_correct', 'question__question_type')
    search_fields = ('text', 'question__text')
    ordering = ('question', 'order')
