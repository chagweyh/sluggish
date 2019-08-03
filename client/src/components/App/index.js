import React from 'react';
import LoggedOut from '../LoggedOut';
import LoggedIn from '../LoggedIn';
import { useAppState, AppStateProvider } from '../../contexts/app-context';

function App() {
  const {
    state: { isAuthenticated },
  } = useAppState();
  return isAuthenticated ? <LoggedIn /> : <LoggedOut />;
}

export default () => (
  <AppStateProvider>
    <App />
  </AppStateProvider>
);
