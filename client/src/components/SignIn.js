import React, { useState } from 'react';
import { Button, Form, Header, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormContainer, FormWrapper } from './styles/Form';

function SignIn() {
  return (
    <FormContainer>
      <FormWrapper>
        <Header as="h2" color="blue">
          Sign in to your account
        </Header>
        <Form>
          <Segment stacked>
            <Form.Input fluid icon="mail" iconPosition="left" placeholder="E-mail address" />
            <Form.Input fluid icon="lock" iconPosition="left" placeholder="Password" type="password" />
            <Button color="blue" fluid size="large">
              Sign in
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? &nbsp;<Link to="/signup">Sign up</Link>
          <Link to="/forgot-password">Forgot Password ?</Link>
        </Message>
      </FormWrapper>
    </FormContainer>
  );
}

export default SignIn;
