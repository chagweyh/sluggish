import React, { useEffect, useState, useContext, Fragment } from 'react';
import { UserContext } from '../contexts/user';
import Channel from './Channel';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Loading from './Loading';
import PrivateRoute from './PrivateRoute';
import API from '../utils/api';

const StyledChat = styled.div`
  display: flex;
  height: 100vh;
`;

function Chat({ match, location }) {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, dispatch] = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const channelsPromise = API.get('/channels');
        const usersPromise = API.get('/users');
        const userPromise = API.get('/users/me');
        const [channelsResponse, usersResponse, userResponse] = await Promise.all([
          channelsPromise,
          usersPromise,
          userPromise,
        ]);
        const users = usersResponse.data.filter((user) => user.username !== userResponse.data.username);
        setUsers(users);
        setChannels(channelsResponse.data);
        dispatch({ type: 'ADD_USER', user: userResponse.data });
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleAddChannel(channel) {
    setChannels((prevState) => [...prevState, channel]);
  }

  if (error) {
    return <h1>error...</h1>;
  }

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <StyledChat>
          <Sidebar
            users={users}
            channels={channels}
            handleAddChannel={(channel) => handleAddChannel(channel)}
            match={match}
          />
          {!loading && location.pathname === '/chat' ? <div>Select a channel</div> : null}
          <PrivateRoute path={`${match.url}/:channelId`} component={Channel} />
        </StyledChat>
      )}
    </Fragment>
  );
}

export default Chat;
