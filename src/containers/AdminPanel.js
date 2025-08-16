import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

const AdminPanel = () => {
  return (
    <Container>
      <Segment style={{ marginTop: '2em' }}>
        <Header as="h1">Admin Panel</Header>
        <p>This component will provide administrative functions for managing users and system settings.</p>
        <p>Coming soon...</p>
      </Segment>
    </Container>
  );
};

export default AdminPanel;
