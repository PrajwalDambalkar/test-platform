# Test Platform Setup Guide

## 🚀 Quick Start

This guide will help you set up the Test Platform project on your local machine.

## 📋 Prerequisites

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/)
- **pip** (usually comes with Python)
- **npm** (comes with Node.js)

## 🔧 Step 1: Project Setup

### 1.1 Clone the Repository
```bash
git clone <your-github-repo-url>
cd test-platform
```

### 1.2 Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 1.3 Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 1.4 Install Node.js Dependencies
```bash
npm install
```

## 🗄️ Step 2: Database Setup

### 2.1 Run Django Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 2.2 Create Superuser
```bash
python manage.py createsuperuser
# Follow the prompts to create your admin account
```

## ⚙️ Step 3: Environment Configuration

### 3.1 Create Environment File
Copy the config file and create your own `.env`:
```bash
# Windows
copy config.py .env

# macOS/Linux
cp config.py .env
```

### 3.2 Edit Environment Variables
Edit `.env` file with your configuration:
```bash
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (for development)
DATABASE_URL=sqlite:///db.sqlite3

# Email (for development)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=noreply@testplatform.com
```

## 🚀 Step 4: Run the Application

### 4.1 Start Django Backend
```bash
python manage.py runserver
```
Backend will be available at: http://127.0.0.1:8000/

### 4.2 Start React Frontend (in a new terminal)
```bash
npm start
```
Frontend will be available at: http://localhost:3000/

### 4.3 Run Both Simultaneously
```bash
npm run dev
```

## 🧪 Step 5: Testing the Setup

### 5.1 Access Django Admin
- Go to: http://127.0.0.1:8000/admin/
- Login with your superuser credentials

### 5.2 Test Frontend
- Go to: http://localhost:3000/
- Try registering a new user
- Test login functionality

## 📱 Step 6: Create Test Users

### 6.1 Create Different Role Users
1. **Student User:**
   - Email: student@test.com
   - Role: STUDENT
   - Username: teststudent

2. **Teacher User:**
   - Email: teacher@test.com
   - Role: TEACHER
   - Username: testteacher

3. **Admin User:**
   - Email: admin@test.com
   - Role: ADMIN
   - Username: testadmin

## 🔍 Step 7: Verify Installation

### 7.1 Check Django Apps
```bash
python manage.py check
```

### 7.2 Check Frontend Build
```bash
npm run build
```

### 7.3 Run Tests
```bash
# Backend tests
pytest

# Frontend tests
npm test
```

## 🛠️ Development Workflow

### Daily Development
1. **Start Backend:** `python manage.py runserver`
2. **Start Frontend:** `npm start`
3. **Or both:** `npm run dev`

### Code Quality
```bash
# Backend formatting
black .
flake8 .
isort .

# Frontend formatting
npm run format
npm run lint
```

### Database Changes
```bash
# After model changes
python manage.py makemigrations
python manage.py migrate
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Kill process on port 8000 (Django)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Kill process on port 3000 (React)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### 2. Module Not Found Errors
```bash
# Reinstall dependencies
pip install -r requirements.txt
npm install
```

#### 3. Database Errors
```bash
# Reset database (WARNING: This deletes all data!)
rm db.sqlite3
python manage.py migrate
python manage.py createsuperuser
```

#### 4. Node Modules Issues
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Getting Help
- Check the console for error messages
- Verify all dependencies are installed
- Ensure virtual environment is activated
- Check file permissions

## 📚 Next Steps

### 1. Explore the Codebase
- Review the Django models in `users/models.py`
- Check the React components in `src/containers/`
- Understand the Redux store structure

### 2. Start Building Features
- Implement test creation for teachers
- Build the test-taking interface for students
- Add analytics and reporting

### 3. Learn Git Workflow
- Create feature branches
- Make commits with descriptive messages
- Push changes to your repository

### 4. Set Up CI/CD
- Configure GitHub Actions
- Set up automated testing
- Deploy to staging/production

## 🎯 Project Structure Overview

```
test-platform/
├── test_platform/          # Django project settings
│   ├── settings.py         # Main configuration
│   ├── urls.py            # URL routing
│   └── wsgi.py            # WSGI configuration
├── users/                  # User management app
│   ├── models.py          # Custom user model
│   ├── views.py           # API views
│   ├── serializers.py     # Data serialization
│   └── admin.py           # Admin interface
├── tests/                  # Test management app
├── questions/              # Question management app
├── results/                # Results and analytics app
├── src/                    # React frontend
│   ├── containers/         # Page components
│   ├── store/              # Redux store
│   └── hoc/                # Higher-order components
├── static/                 # Static files
├── media/                  # User uploads
├── requirements.txt        # Python dependencies
├── package.json            # Node.js dependencies
└── manage.py              # Django management
```

## 🚀 Ready to Go!

Your Test Platform is now set up and ready for development. Start building amazing features and learning Django + React!

## 📞 Support

If you encounter any issues:
1. Check this setup guide
2. Review error messages in the console
3. Check the project documentation
4. Create an issue in your repository

Happy coding! 🎉
