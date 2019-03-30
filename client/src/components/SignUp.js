import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { FormContainer, FormWrapper } from './styles/Form';
import Errors from './Errors';
import API from '../utils/api';

function SignUp(props) {
  const [form, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const schema = yup.object().shape({
    username: yup
      .string()
      .min(2)
      .max(50)
      .required(),
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

  async function validateForm() {
    try {
      await schema.validate(form, { abortEarly: false });
    } catch ({ inner }) {
      return inner.reduce(
        (errors, error) => ({
          ...errors,
          [`${error.name}-${error.path}`]: error.message,
        }),
        {},
      );
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = await validateForm();
    setErrors(validationErrors);
    if (validationErrors) return;

    try {
      const response = await API.post('/signup', form);
      localStorage.setItem('token', response.headers['x-auth-token']);
      props.history.push('/chat');
    } catch (error) {
      const { statusText, data } = error.response;
      setErrors({ [statusText]: data });
    }
  }

  return (
    <FormContainer>
      <FormWrapper>
        <Header as="h2" color="blue">
          Create a new account
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              name="username"
              value={form.username}
              placeholder="Username"
              onChange={handleChange}
            />
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
              Sign up
            </Button>
          </Segment>
        </Form>
        {errors && <Errors errors={errors} />}
        <Segment secondary>
          Already have an account? &nbsp;<Link to="/">Sign in</Link>
        </Segment>
      </FormWrapper>
    </FormContainer>
  );
}

export default SignUp;
