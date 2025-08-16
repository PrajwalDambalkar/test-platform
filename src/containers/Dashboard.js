import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Header, 
  Grid, 
  Card, 
  Icon, 
  Button, 
  Segment,
  Statistic,
  Divider 
} from 'semantic-ui-react';
import { selectUser, selectUserRole } from '../store/slices/authSlice';

const Dashboard = () => {
  const user = useSelector(selectUser);
  const userRole = useSelector(selectUserRole);

  const renderStudentDashboard = () => (
    <div>
      <Header as="h2" icon textAlign="center">
        <Icon name="graduation cap" circular />
        <Header.Content>Student Dashboard</Header.Content>
      </Header>
      
      <Grid stackable columns={3} style={{ marginTop: '2em' }}>
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>Available Tests</Card.Header>
              <Card.Description>
                View and take tests assigned by your teachers
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to="/tests">
                <Button primary fluid>View Tests</Button>
              </Link>
            </Card.Content>
          </Card>
        </Grid.Column>
        
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>My Results</Card.Header>
              <Card.Description>
                Check your test results and performance
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to="/results">
                <Button primary fluid>View Results</Button>
              </Link>
            </Card.Content>
          </Card>
        </Grid.Column>
        
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>Progress</Card.Header>
              <Card.Description>
                Track your learning progress over time
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button primary fluid>View Progress</Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>

      <Segment style={{ marginTop: '2em' }}>
        <Header as="h3">Quick Stats</Header>
        <Grid columns={4} divided>
          <Grid.Row>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>5</Statistic.Value>
                <Statistic.Label>Tests Taken</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>85%</Statistic.Value>
                <Statistic.Label>Average Score</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>3</Statistic.Value>
                <Statistic.Label>Tests Available</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>12</Statistic.Value>
                <Statistic.Label>Hours Studied</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );

  const renderTeacherDashboard = () => (
    <div>
      <Header as="h2" icon textAlign="center">
        <Icon name="edit" circular />
        <Header.Content>Teacher Dashboard</Header.Content>
      </Header>
      
      <Grid stackable columns={3} style={{ marginTop: '2em' }}>
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>Manage Tests</Card.Header>
              <Card.Description>
                Create, edit, and manage your tests
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to="/teacher/tests">
                <Button primary fluid>Manage Tests</Button>
              </Link>
            </Card.Content>
          </Card>
        </Grid.Column>
        
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>View Results</Card.Header>
              <Card.Description>
                Analyze student performance and results
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to="/teacher/results">
                <Button primary fluid>View Results</Button>
              </Link>
            </Card.Content>
          </Card>
        </Grid.Column>
        
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>Student Management</Card.Header>
              <Card.Description>
                Manage your student roster and assignments
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button primary fluid>Manage Students</Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>

      <Segment style={{ marginTop: '2em' }}>
        <Header as="h3">Class Overview</Header>
        <Grid columns={4} divided>
          <Grid.Row>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>25</Statistic.Value>
                <Statistic.Label>Total Students</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>8</Statistic.Value>
                <Statistic.Label>Active Tests</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>78%</Statistic.Value>
                <Statistic.Label>Class Average</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>156</Statistic.Value>
                <Statistic.Label>Tests Completed</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );

  const renderAdminDashboard = () => (
    <div>
      <Header as="h2" icon textAlign="center">
        <Icon name="settings" circular />
        <Header.Content>Admin Dashboard</Header.Content>
      </Header>
      
      <Grid stackable columns={3} style={{ marginTop: '2em' }}>
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>User Management</Card.Header>
              <Card.Description>
                Manage users, roles, and permissions
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to="/admin">
                <Button primary fluid>Manage Users</Button>
              </Link>
            </Card.Content>
          </Card>
        </Grid.Column>
        
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>System Settings</Card.Header>
              <Card.Description>
                Configure platform settings and preferences
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button primary fluid>Settings</Button>
            </Card.Content>
          </Card>
        </Grid.Column>
        
        <Grid.Column>
          <Card fluid>
            <Card.Content>
              <Card.Header>Analytics</Card.Header>
              <Card.Description>
                View system-wide analytics and reports
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button primary fluid>View Analytics</Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>

      <Segment style={{ marginTop: '2em' }}>
        <Header as="h3">Platform Overview</Header>
        <Grid columns={4} divided>
          <Grid.Row>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>150</Statistic.Value>
                <Statistic.Label>Total Users</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>45</Statistic.Value>
                <Statistic.Label>Active Tests</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>1,250</Statistic.Value>
                <Statistic.Label>Tests Taken</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column>
              <Statistic>
                <Statistic.Value>98%</Statistic.Value>
                <Statistic.Label>Uptime</Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );

  const renderDashboard = () => {
    switch (userRole) {
      case 'STUDENT':
        return renderStudentDashboard();
      case 'TEACHER':
        return renderTeacherDashboard();
      case 'ADMIN':
        return renderAdminDashboard();
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <Container>
      <Segment style={{ marginTop: '2em' }}>
        <Header as="h1" textAlign="center">
          Welcome back, {user?.first_name || 'User'}!
        </Header>
        <Divider />
        {renderDashboard()}
      </Segment>
    </Container>
  );
};

export default Dashboard;
