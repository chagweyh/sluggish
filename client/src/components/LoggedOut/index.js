import React from 'react';
import { Router } from '@reach/router';
import NotFound from '../NotFound';
import SignIn from '../SignIn';
import SignUp from '../SignUp';
import Reset from '../Reset';
import ForgotPassword from '../ForgotPassword';

const LoggedOut = () => (
  <Router>
    <SignIn path="/" />
    <SignUp path="/signup" />
    <Reset path="/reset" />
    <ForgotPassword path="/forgot-password" />
    <NotFound default />
  </Router>
);

export default LoggedOut;
