import React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { FormContainer, FormWrapper } from '../styles/Form';

const Reset = () => (
  <FormContainer>
    <FormWrapper>
      <Header as="h2" color="blue">
        Reset Your Password
      </Header>
      <Form>
        <Segment stacked>
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
          />
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm password"
            type="password"
          />
          <Button color="blue" fluid size="large">
            Reset Password
          </Button>
        </Segment>
      </Form>
    </FormWrapper>
  </FormContainer>
);

export default Reset;
