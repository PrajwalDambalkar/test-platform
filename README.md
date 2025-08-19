# Test Platform - Django + React

A comprehensive test platform built with Django backend and React frontend, supporting three user roles: Students, Teachers, and Administrators.

## 🚀 Features

### User Management
- **Role-based authentication** (Student, Teacher, Admin)
- **JWT-based authentication** with refresh tokens
- **User profile management** with role-specific fields
- **Secure password handling**

### Test Management
- **Create and manage tests** (Teachers)
- **Multiple question types** support
- **Test scheduling and time limits**
- **Randomized question order** (optional)
- **Passing score configuration**

### Test Taking
- **Student test interface**
- **Real-time test taking**
- **Auto-submission on time limit**
- **Immediate or delayed results** (configurable)

### Analytics & Reporting
- **Performance metrics** for students
- **Grade distribution** analysis
- **Progress tracking** over time
- **Teacher dashboard** with student insights

## 🛠️ Tech Stack

### Backend
- **Django 4.2+** - Web framework
- **Django REST Framework** - API development
- **JWT Authentication** - Secure token-based auth
- **PostgreSQL/SQLite** - Database
- **Django Allauth** - User authentication

### Frontend
- **React 18+** - UI library
- **Redux Toolkit** - State management
- **React Router** - Navigation
- **Semantic UI** - Component library
- **Axios** - HTTP client

### Development Tools
- **Pytest** - Testing framework
- **Black** - Code formatting
- **Flake8** - Linting
- **ESLint & Prettier** - Frontend code quality

## 📁 Project Structure

```
test-platform/
├── test_platform/          # Django project settings
├── users/                  # User management app
├── tests/                  # Test management app
├── questions/              # Question management app
├── results/                # Results and analytics app
├── src/                    # React frontend
├── static/                 # Static files
├── media/                  # User uploads
├── requirements.txt        # Python dependencies
├── package.json            # Node.js dependencies
└── manage.py              # Django management
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- pip
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd test-platform
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   # Create a .env file with your configuration
   SECRET_KEY=your-secret-key
   DEBUG=True
   DATABASE_URL=your-database-url
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run development server**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

### Combined Development

Run both backend and frontend simultaneously:
```bash
npm run dev
```

## 🔐 User Roles

### Student
- Take tests assigned by teachers
- View test results and feedback
- Track progress over time
- Access study materials

### Teacher
- Create and manage tests
- Assign tests to students
- View student performance analytics
- Manage question banks

### Administrator
- User management and role assignment
- System configuration
- Overall platform analytics
- Content moderation

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/profile/` - Get user profile
- `PUT /api/auth/update/` - Update user profile

### Tests
- `GET /api/tests/` - List tests
- `POST /api/tests/` - Create test
- `GET /api/tests/{id}/` - Get test details
- `PUT /api/tests/{id}/` - Update test
- `DELETE /api/tests/{id}/` - Delete test

### Questions
- `GET /api/questions/` - List questions
- `POST /api/questions/` - Create question
- `GET /api/questions/{id}/` - Get question details

### Results
- `GET /api/results/` - List results
- `POST /api/results/` - Submit test results
- `GET /api/results/{id}/` - Get result details

## 🧪 Testing

### Backend Testing
```bash
pytest
pytest --cov
pytest --cov-report=html
```

### Frontend Testing
```bash
npm test
npm run test:coverage
```

## 📝 Code Quality

### Backend
```bash
black .
flake8 .
isort .
```

### Frontend
```bash
npm run lint
npm run format
```

## 🚀 Deployment

### Environment Variables
- `SECRET_KEY` - Django secret key
- `DEBUG` - Debug mode (False for production)
- `ALLOWED_HOSTS` - Allowed hostnames
- `DATABASE_URL` - Database connection string
- `EMAIL_BACKEND` - Email configuration

### Production Checklist
- [ ] Set `DEBUG=False`
- [ ] Configure production database
- [ ] Set up email backend
- [ ] Configure static file serving
- [ ] Set up HTTPS
- [ ] Configure logging
- [ ] Set up monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔮 Roadmap

- [ ] Advanced question types (essay, file upload)
- [ ] Real-time collaboration
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Integration with LMS systems
- [ ] Multi-language support
- [ ] Accessibility improvements
