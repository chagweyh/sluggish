import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

function PrivateRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={(props) => (getCurrentUser() ? <Component {...props} /> : <Redirect to="/" />)} />;
}

export default PrivateRoute;
