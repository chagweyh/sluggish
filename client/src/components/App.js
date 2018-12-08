import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignIn from './SignIn';
import Chat from './Chat';
import SignUp from './SignUp';
import Reset from './Reset';
import ForgotPassword from './ForgotPassword';
import SignOut from './SignOut';
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/chat" component={Chat} />
          <Route path="/signup" component={SignUp} />
          <Route path="/reset" component={Reset} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/signout" component={SignOut} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
