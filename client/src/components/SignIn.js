import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Header, Message, Segment, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormContainer, FormWrapper } from './styles/Form';
import { getCurrentUser } from '../services/authService';

function SignIn() {
  if (getCurrentUser()) return <Redirect to="/chat" />;
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
        <Segment secondary>
          <Grid>
            <Grid.Column floated="left" width={6}>
              New to us? &nbsp;<Link to="/signup">Sign up</Link>
            </Grid.Column>
            <Grid.Column floated="right" width={6}>
              <Link to="/forgot-password">Forgot Password ?</Link>
            </Grid.Column>
          </Grid>
        </Segment>
      </FormWrapper>
    </FormContainer>
  );
}

export default SignIn;
