import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

const TestList = () => {
  return (
    <Container>
      <Segment style={{ marginTop: '2em' }}>
        <Header as="h1">Test List</Header>
        <p>This component will show available tests for students or test management for teachers.</p>
        <p>Coming soon...</p>
      </Segment>
    </Container>
  );
};

export default TestList;
