import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Button, 
  Container, 
  Header, 
  Icon, 
  Segment, 
  Grid, 
  Card, 
  Image 
} from 'semantic-ui-react';
import { selectIsAuthenticated, selectUserRole } from '../store/slices/authSlice';

const Home = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  const features = [
    {
      icon: 'edit',
      title: 'Create Tests',
      description: 'Teachers can easily create and manage comprehensive tests with various question types.',
      color: 'blue'
    },
    {
      icon: 'graduation cap',
      title: 'Take Tests',
      description: 'Students can take tests in a user-friendly interface with real-time progress tracking.',
      color: 'green'
    },
    {
      icon: 'chart bar',
      title: 'Analytics',
      description: 'Comprehensive analytics and reporting for both students and teachers.',
      color: 'orange'
    },
    {
      icon: 'users',
      title: 'User Management',
      description: 'Role-based access control for students, teachers, and administrators.',
      color: 'purple'
    }
  ];

  const renderHeroSection = () => (
    <Segment textAlign="center" style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header
          as="h1"
          content="Test Platform"
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '3em',
          }}
        />
        <Header
          as="h2"
          content="A comprehensive platform for creating, taking, and analyzing tests"
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em',
          }}
        />
        {!isAuthenticated ? (
          <div style={{ marginTop: '2em' }}>
            <Link to="/signup">
              <Button size="huge" primary>
                Get Started
                <Icon name="right arrow" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="huge" style={{ marginLeft: '1em' }}>
                Sign In
              </Button>
            </Link>
          </div>
        ) : (
          <div style={{ marginTop: '2em' }}>
            <Link to="/dashboard">
              <Button size="huge" primary>
                Go to Dashboard
                <Icon name="right arrow" />
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </Segment>
  );

  const renderFeatures = () => (
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as="h3" style={{ fontSize: '2em' }}>
          Features
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Our platform provides everything you need for effective testing and learning.
        </p>
        <Grid stackable columns={2} style={{ marginTop: '3em' }}>
          {features.map((feature, index) => (
            <Grid.Column key={index}>
              <Card fluid>
                <Card.Content textAlign="center">
                  <Icon name={feature.icon} size="huge" color={feature.color} />
                  <Card.Header>{feature.title}</Card.Header>
                  <Card.Description>{feature.description}</Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          ))}
        </Grid>
      </Container>
    </Segment>
  );

  const renderRoleSpecificInfo = () => {
    if (!isAuthenticated) return null;

    const roleInfo = {
      STUDENT: {
        title: 'Student Dashboard',
        description: 'Access your assigned tests, track progress, and view results.',
        action: 'View Tests',
        path: '/tests'
      },
      TEACHER: {
        title: 'Teacher Dashboard',
        description: 'Create tests, manage students, and analyze performance.',
        action: 'Manage Tests',
        path: '/teacher/tests'
      },
      ADMIN: {
        title: 'Admin Panel',
        description: 'Manage users, system settings, and platform configuration.',
        action: 'Admin Panel',
        path: '/admin'
      }
    };

    const info = roleInfo[userRole];
    if (!info) return null;

    return (
      <Segment style={{ padding: '4em 0em' }} vertical>
        <Container text>
          <Header as="h3" style={{ fontSize: '2em' }}>
            {info.title}
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            {info.description}
          </p>
          <Link to={info.path}>
            <Button size="large" primary>
              {info.action}
              <Icon name="right arrow" />
            </Button>
          </Link>
        </Container>
      </Segment>
    );
  };

  return (
    <div>
      {renderHeroSection()}
      {renderFeatures()}
      {renderRoleSpecificInfo()}
    </div>
  );
};

export default Home;
