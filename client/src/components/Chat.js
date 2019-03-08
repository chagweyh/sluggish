import axios from 'axios';
import React, { useEffect, useState, Fragment } from 'react';
import Channel from './Channel';
import styled from 'styled-components';
import Sidebar from './Sidebar';
import Loading from './Loading';
import { getCurrentUser } from '../utils/auth';
import PrivateRoute from './PrivateRoute';

const StyledChat = styled.div`
  display: flex;
  height: 100vh;
`;

function Chat({ match, location }) {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const channelsPromise = axios.get('/api/channels');
        const usersPromise = axios.get('/api/users');
        const [channelsResponse, usersResponse] = await axios.all([channelsPromise, usersPromise]);
        const channels = channelsResponse.data;
        const users = usersResponse.data.filter((user) => user.username !== getCurrentUser().username);
        setUsers(users);
        setChannels(channels);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
