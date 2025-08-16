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
  Container 
} from 'semantic-ui-react';
import { loginUser, clearError, selectAuthLoading, selectAuthError } from '../store/slices/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const isLoading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});

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
    
    if (!formData.password) {
      errors.password = 'Password is required';
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
      await dispatch(loginUser(formData)).unwrap();
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the reducer
      console.error('Login failed:', error);
    }
  };

  return (
    <Container style={{ marginTop: '2em' }}>
      <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log in to your account
          </Header>
          
          <Form size="large" onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={formErrors.email ? { content: formErrors.email, pointing: 'below' } : false}
              />
              
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

              <Button 
                color="teal" 
                fluid 
                size="large" 
                type="submit"
                loading={isLoading}
                disabled={isLoading}
              >
                Log in
              </Button>
            </Segment>
          </Form>

          {error && (
            <Message negative>
              <Message.Header>Login Failed</Message.Header>
              <p>{error.error || error}</p>
            </Message>
          )}

          <Message>
            New to us? <Link to="/signup">Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Login;
