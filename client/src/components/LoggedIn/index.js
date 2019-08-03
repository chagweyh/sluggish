import React from 'react';
import { Router, Redirect } from '@reach/router';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import Channel from '../Channel';
import Sidebar from '../Sidebar';
import { useAppState } from '../../contexts/app-context';
import { getCurrentUser } from '../../API/UsersAPI';

function LoggedIn() {
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
      <div
        css={css`
          display: flex;
          height: 100vh;
        `}
      >
        <Sidebar user={user} dispatch={dispatch} />
        <Router>
          <Channel path="/channel/:slug" user={user} />
          <Redirect noThrow from="/" to="channel/general" />
        </Router>
      </div>
    )
  );
}

export default LoggedIn;
