import React, { useState, useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { FormContainer, FormWrapper } from './styles/Form';
import Errors from './Errors';

function SignUp() {
  const [form, setValues] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [validationErrors, setValidationErrors] = useState(null);

  const handleChange = e => {
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

  const validateForm = async () => {
    try {
      await schema.validate(form, { abortEarly: false });
    } catch ({ inner }) {
      return inner.reduce(
        (errors, error) => ({
          ...errors,
          [error.path]: error.message,
        }),
        {}
      );
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const errors = await validateForm();
      setValidationErrors(errors);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormContainer>
      <FormWrapper>
        <Header as="h2" color="blue">
          Create a new account
        </Header>
        <Form onSubmit={handleSubmit}>
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
        {validationErrors && <Errors errors={validationErrors} />}
        <Segment secondary>
          Already have an account? &nbsp;<Link to="/">Sign in</Link>
        </Segment>
      </FormWrapper>
    </FormContainer>
  );
}

export default SignUp;
