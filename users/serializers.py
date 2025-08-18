from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration
    """
    password = serializers.CharField(write_only=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = [
            'email', 'username', 'password', 'password2', 'first_name', 
            'last_name', 'role', 'phone_number', 'date_of_birth'
        ]
        extra_kwargs = {
            'first_name': {'required': False, 'allow_blank': True},
            'last_name': {'required': False, 'allow_blank': True},
            'role': {'required': False, 'default': 'STUDENT'},
            'phone_number': {'required': False, 'allow_blank': True},
            'date_of_birth': {'required': False, 'allow_null': True}
        }
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError("Passwords don't match")
        
        # Set default values if not provided
        if not attrs.get('first_name'):
            attrs['first_name'] = attrs.get('username', '')
        if not attrs.get('last_name'):
            attrs['last_name'] = ''
        if not attrs.get('role'):
            attrs['role'] = 'STUDENT'
            
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class UserLoginSerializer(serializers.Serializer):
    """
    Serializer for user login
    """
    email = serializers.EmailField()
    password = serializers.CharField()

class UserProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for user profile
    """
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username', 'first_name', 'last_name', 'role',
            'bio', 'date_of_birth', 'phone_number',
            'student_id', 'grade_level', 'teacher_id', 'subject_taught',
            'years_of_experience', 'department', 'date_joined'
        ]
        read_only_fields = ['id', 'email', 'role', 'date_joined']

class UserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating user profile
    """
    class Meta:
        model = User
        fields = [
            'first_name', 'last_name', 'bio',
            'date_of_birth', 'phone_number', 'student_id', 'grade_level',
            'teacher_id', 'subject_taught', 'years_of_experience', 'department'
        ]
    
    def update(self, instance, validated_data):
        # Only allow updating fields that are appropriate for the user's role
        if instance.is_student:
            # Remove teacher/admin specific fields
            validated_data.pop('teacher_id', None)
            validated_data.pop('subject_taught', None)
            validated_data.pop('years_of_experience', None)
            validated_data.pop('department', None)
        elif instance.is_teacher:
            # Remove student/admin specific fields
            validated_data.pop('student_id', None)
            validated_data.pop('grade_level', None)
            validated_data.pop('department', None)
        elif instance.is_admin:
            # Remove student/teacher specific fields
            validated_data.pop('student_id', None)
            validated_data.pop('grade_level', None)
            validated_data.pop('teacher_id', None)
            validated_data.pop('subject_taught', None)
            validated_data.pop('years_of_experience', None)
        
        return super().update(instance, validated_data)

class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for changing password
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])
    new_password2 = serializers.CharField(required=True)
    
    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError("New passwords don't match")
        return attrs
    
    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect")
        return value
