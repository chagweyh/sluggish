import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isTokenExpired } from '../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (isTokenExpired() ? <Redirect to="/" /> : <Component {...props} />)} />
);

export default PrivateRoute;
