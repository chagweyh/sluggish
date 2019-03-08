import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './Loading';
import NotFound from './NotFound';
import Chat from './Chat';
// const PrivateRoute = lazy(() => import('./PrivateRoute'));
import PrivateRoute from './PrivateRoute';
const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));
// const Chat = lazy(() => import('./Chat'));
const Reset = lazy(() => import('./Reset'));
const ForgotPassword = lazy(() => import('./ForgotPassword'));
const SignOut = lazy(() => import('./SignOut'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/" render={() => <SignIn />} />
          {/* <Route path="/chat" render={(props) => <Chat {...props} />} /> */}
          {/* <Route path="/chat" component={Chat} /> */}
          <PrivateRoute path="/chat" component={Chat} />
          <Route path="/signup" render={() => <SignUp />} />
          <Route path="/reset" render={() => <Reset />} />
          <Route path="/forgot-password" render={() => <ForgotPassword />} />
          <Route path="/signout" render={() => <SignOut />} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
