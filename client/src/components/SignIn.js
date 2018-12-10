import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import * as yup from 'yup';
import { Button, Form, Header, Segment, Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Errors from './Errors';
import axios from 'axios';
import { FormContainer, FormWrapper } from './styles/Form';
import { getCurrentUser } from '../services/authService';

function SignIn() {
  const [form, setValues] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(null);
  // const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: yup
      .string()
      .min(5)
      .max(255)
      .required(),
  });

  const validateForm = async () => {
    try {
      await schema.validate(form, { abortEarly: false });
    } catch ({ inner }) {
      // console.log(inner);
      return inner.reduce(
        (errors, error) => ({
          ...errors,
          [`${error.name}-${error.path}`]: error.message,
        }),
        {}
      );
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = await validateForm();
    setErrors(validationErrors);
    if (validationErrors) return;

    try {
      const response = await axios.post('/api/signin', form);
      console.log(response);
      localStorage.setItem('token', response.data);
      window.location = '/chat';
    } catch (error) {
      // console.log(error.response.data);
      // console.log({ ...error });
      const { statusText, data } = error.response;
      setErrors({ [statusText]: data });
    }
  };

  if (getCurrentUser()) return <Redirect to="/chat" />;
  return (
    <FormContainer>
      <FormWrapper>
        <Header as="h2" color="blue">
          Sign in to your account
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
