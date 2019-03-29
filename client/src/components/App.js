import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './Loading';
import NotFound from './NotFound';
import PrivateRoute from './PrivateRoute';
import { UserProvider } from '../contexts/user';
const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));
const Chat = lazy(() => import('./Chat'));
const Reset = lazy(() => import('./Reset'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const SignOut = lazy(() => import('./SignOut'));

function App() {
  return (
    <Router>
      <UserProvider>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route exact path="/" component={SignIn} />
            <PrivateRoute path="/chat" component={Chat} />
            <Route path="/signup" component={SignUp} />
            <Route path="/reset" component={Reset} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/signout" component={SignOut} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </UserProvider>
    </Router>
  );
}

export default App;
