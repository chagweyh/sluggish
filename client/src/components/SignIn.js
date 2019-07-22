import React, { useState } from 'react';
import * as yup from 'yup';
import { Button, Form, Header, Segment, Grid } from 'semantic-ui-react';
import { Link } from '@reach/router';
import Errors from './Errors';
import { FormContainer, FormWrapper } from './styles/Form';
import { login } from '../API/AuthAPI';
import { useAppState } from '../contexts/user';
import { validateForm } from '../utils';

const SignInSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(5)
    .max(255)
    .required(),
});

function SignIn() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(null);
  const { dispatch } = useAppState();

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = await validateForm(form, SignInSchema);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }
    try {
      await login(form.email, form.password);
      dispatch({ type: 'LOGIN' });
    } catch (error) {
      console.log(error.response);
      const { statusText, data } = error.response;
      setErrors({ [statusText]: data });
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <Header as="h2" color="blue">
          Sign in to your account!
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="mail"
              iconPosition="left"
              name="email"
              type="email"
              value={form.email}
              placeholder="E-mail address"
              onChange={handleChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              name="password"
              value={form.password}
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <Button color="blue" fluid size="large">
              Sign in
            </Button>
          </Segment>
        </Form>
        {errors && <Errors errors={errors} />}
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
