import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SignIn from './SignIn';
import Chat from './Chat';
import SignUp from './SignUp';
import Reset from './Reset';
import ForgotPassword from './ForgotPassword';

function App() {
  return (
    <Router>
      <Fragment>
        <Route exact path="/" component={SignIn} />
        <Route path="/chat" component={Chat} />
        <Route path="/signup" component={SignUp} />
        <Route path="/reset" component={Reset} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </Fragment>
    </Router>
  );
}

export default App;
