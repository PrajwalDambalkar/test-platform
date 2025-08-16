from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Admin configuration for custom User model
    """
    list_display = ('email', 'username', 'first_name', 'last_name', 'role', 'is_active', 'date_joined')
    list_filter = ('role', 'is_active', 'is_staff', 'is_superuser', 'date_joined')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('-date_joined',)
    
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {
            'fields': ('username', 'first_name', 'last_name', 'profile_picture', 'bio', 'date_of_birth', 'phone_number')
        }),
        (_('Role & Permissions'), {
            'fields': ('role', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        (_('Student Info'), {
            'fields': ('student_id', 'grade_level'),
            'classes': ('collapse',),
        }),
        (_('Teacher Info'), {
            'fields': ('teacher_id', 'subject_taught', 'years_of_experience'),
            'classes': ('collapse',),
        }),
        (_('Admin Info'), {
            'fields': ('department',),
            'classes': ('collapse',),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2', 'role'),
        }),
    )
    
    def get_fieldsets(self, request, obj=None):
        """
        Dynamically show/hide fieldsets based on user role
        """
        if not obj:  # Adding new user
            return self.add_fieldsets
        
        fieldsets = list(self.fieldsets)
        
        # Hide role-specific fieldsets if not applicable
        if obj.role != User.Role.STUDENT:
            fieldsets = [f for f in fieldsets if f[0] != _('Student Info')]
        
        if obj.role != User.Role.TEACHER:
            fieldsets = [f for f in fieldsets if f[0] != _('Teacher Info')]
        
        if obj.role != User.Role.ADMIN:
            fieldsets = [f for f in fieldsets if f[0] != _('Admin Info')]
        
        return fieldsets
