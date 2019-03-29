import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (getCurrentUser() ? <Component {...props} /> : <Redirect to="/" />)} />
);

export default PrivateRoute;
