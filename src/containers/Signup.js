import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Form, 
  Grid, 
  Header, 
  Message, 
  Segment,
  Container,
  Dropdown 
} from 'semantic-ui-react';
import { registerUser, clearError, selectAuthLoading, selectAuthError } from '../store/slices/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    role: '',
    phone_number: ''
  });

  const [formErrors, setFormErrors] = useState({});

  const roleOptions = [
    { key: 'STUDENT', text: 'Student', value: 'STUDENT' },
    { key: 'TEACHER', text: 'Teacher', value: 'TEACHER' },
    { key: 'ADMIN', text: 'Administrator', value: 'ADMIN' }
  ];

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  const handleInputChange = (e, { name, value }) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.username) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.password2) {
      errors.password2 = 'Please confirm your password';
    } else if (formData.password !== formData.password2) {
      errors.password2 = 'Passwords do not match';
    }
    
    if (!formData.first_name) {
      errors.first_name = 'First name is required';
    }
    
    if (!formData.last_name) {
      errors.last_name = 'Last name is required';
    }
    
    if (!formData.role) {
      errors.role = 'Please select a role';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the reducer
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 600 }}>
          <Header as="h2" color="teal" textAlign="center">
            Create your account
          </Header>
          
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  error={formErrors.first_name ? { content: formErrors.first_name, pointing: 'below' } : false}
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  error={formErrors.last_name ? { content: formErrors.last_name, pointing: 'below' } : false}
                />
              </Form.Group>

              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email ? { content: formErrors.email, pointing: 'below' } : false}
              />

              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={formErrors.username ? { content: formErrors.username, pointing: 'below' } : false}
              />

              <Form.Dropdown
                fluid
                selection
                placeholder="Select Role"
                options={roleOptions}
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                error={formErrors.role ? { content: formErrors.role, pointing: 'below' } : false}
              />

              <Form.Input
                fluid
                icon="phone"
                iconPosition="left"
                placeholder="Phone Number (optional)"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />

              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  error={formErrors.password ? { content: formErrors.password, pointing: 'below' } : false}
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleInputChange}
                  error={formErrors.password2 ? { content: formErrors.password2, pointing: 'below' } : false}
                />
              </Form.Group>

              <Button 
                color="teal" 
                fluid 
                size="large" 
                type="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                Sign Up
              </Button>
            </Segment>
          </Form>

          {error && (
            <Message negative>
              <Message.Header>Registration Failed</Message.Header>
              <p>{error.error || error}</p>
            </Message>
          )}

          <Message>
            Already have an account? <Link to="/login">Log In</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Signup;

