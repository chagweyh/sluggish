import React from 'react';
import { useAppState } from '../contexts/user';
import { getCurrentUser } from '../API/UsersAPI';
import { Router, Redirect } from '@reach/router';
import Channel from './Channel';
import styled from 'styled-components/macro';
import Sidebar from './Sidebar';

export default function LoggedIn() {
  const {
    state: { user, isAuthenticated },
    dispatch,
  } = useAppState();

  React.useEffect(() => {
    let ignore = false;

    async function fetchUser() {
      try {
        const payload = await getCurrentUser();
        if (!ignore) {
          dispatch({ type: 'LOAD_USER', user: payload.data });
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (!user && isAuthenticated) {
      fetchUser();
    }

    return () => {
      ignore = true;
    };
  }, [dispatch, isAuthenticated, user]);

  return (
    user && (
      <StyledChat>
        <Sidebar user={user} dispatch={dispatch} />
        <Router>
          <Channel path="/channel/:slug" user={user} />
          <Redirect noThrow from="/" to="channel/general" />
        </Router>
      </StyledChat>
    )
  );
}

const StyledChat = styled.div`
  display: flex;
  height: 100vh;
`;
