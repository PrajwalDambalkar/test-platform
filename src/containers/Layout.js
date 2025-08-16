import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Container, Menu, Segment, Icon, Dropdown } from 'semantic-ui-react';
import { selectUser, selectIsAuthenticated, selectUserRole, logoutUser } from '../store/slices/authSlice';
import 'semantic-ui-css/semantic.min.css';

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  const [activeItem, setActiveItem] = useState('home');

  useEffect(() => {
    // Set active menu item based on current path
    const path = location.pathname;
    if (path === '/') setActiveItem('home');
    else if (path === '/dashboard') setActiveItem('dashboard');
    else if (path === '/tests') setActiveItem('tests');
    else if (path === '/results') setActiveItem('results');
    else if (path === '/admin') setActiveItem('admin');
  }, [location]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser(user?.refreshToken)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const renderNavigation = () => {
    if (!isAuthenticated) {
      return (
        <Menu.Menu position="right">
          <Menu.Item>
            <Link to="/login">
              <Button primary>Login</Button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/signup">
              <Button>Sign Up</Button>
            </Link>
          </Menu.Item>
        </Menu.Menu>
      );
    }

    return (
      <Menu.Menu position="right">
        <Menu.Item>
          <Dropdown text={user?.email || 'User'} pointing className="link item">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/dashboard">
                <Icon name="dashboard" />
                Dashboard
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/profile">
                <Icon name="user" />
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                <Icon name="sign-out" />
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    );
  };

  const renderMenuItems = () => {
    if (!isAuthenticated) return null;

    const menuItems = [
      { name: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: 'dashboard' }
    ];

    // Add role-specific menu items
    if (userRole === 'STUDENT') {
      menuItems.push(
        { name: 'tests', path: '/tests', label: 'Available Tests', icon: 'edit' },
        { name: 'results', path: '/results', label: 'My Results', icon: 'chart bar' }
      );
    }

    if (userRole === 'TEACHER') {
      menuItems.push(
        { name: 'tests', path: '/teacher/tests', label: 'Manage Tests', icon: 'edit' },
        { name: 'results', path: '/teacher/results', label: 'View Results', icon: 'chart bar' }
      );
    }

    if (userRole === 'ADMIN') {
      menuItems.push(
        { name: 'admin', path: '/admin', label: 'Admin Panel', icon: 'settings' }
      );
    }

    return menuItems.map(item => (
      <Menu.Item
        key={item.name}
        as={Link}
        to={item.path}
        name={item.name}
        active={activeItem === item.name}
        onClick={() => setActiveItem(item.name)}
      >
        <Icon name={item.icon} />
        {item.label}
      </Menu.Item>
    ));
  };

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item
            as={Link}
            to="/"
            header
            onClick={() => setActiveItem('home')}
          >
            <Icon name="graduation cap" />
            Test Platform
          </Menu.Item>
          
          {renderMenuItems()}
          {renderNavigation()}
        </Container>
      </Menu>

      <Container style={{ marginTop: '5em', marginBottom: '2em' }}>
        {children}
      </Container>

      <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
        <Container textAlign="center">
          <p>&copy; 2024 Test Platform. All rights reserved.</p>
        </Container>
      </Segment>
    </div>
  );
};

export default Layout;
