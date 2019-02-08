import React from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormContainer, FormWrapper } from './styles/Form';

function Reset() {
  return (
    <FormContainer>
      <FormWrapper>
        <Header as="h2" color="blue">
          I Forgot My Password
        </Header>
        <Form>
          <Segment stacked>
            <Form.Input fluid icon="mail" iconPosition="left" placeholder="Email" type="email" />
            <Button color="blue" fluid size="large">
              Get Reset Link
            </Button>
          </Segment>
        </Form>
        <Segment secondary>
          <Link to="/">I remember my password</Link>
        </Segment>
      </FormWrapper>
    </FormContainer>
  );
}

export default Reset;
