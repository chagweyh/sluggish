import React from 'react';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormContainer, FormWrapper } from './styles/Form';

function SignUp() {
  return (
    <FormContainer>
      <FormWrapper>
        <Header as="h2" color="blue">
          Create a new account
        </Header>
        <Form>
          <Segment stacked>
            <Form.Input fluid icon="user" iconPosition="left" placeholder="Username" />
            <Form.Input fluid icon="mail" iconPosition="left" placeholder="E-mail address" />
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />
            <Button color="blue" fluid size="large">
              Sign up
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have an account? &nbsp;<Link to="/">Sign in</Link>
        </Message>
      </FormWrapper>
    </FormContainer>
  );
}

export default SignUp;
