import React from 'react';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormContainer, FormWrapper } from './styles/Form';

function Reset() {
  return (
    <FormContainer>
      <FormWrapper>
        <Header as="h2" color="blue">
          Reset Your Password
        </Header>
        <Form>
          <Segment stacked>
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Confirm password" type="password" />
            <Button color="blue" fluid size="large">
              Reset Password
            </Button>
          </Segment>
        </Form>
      </FormWrapper>
    </FormContainer>
  );
}

export default Reset;
