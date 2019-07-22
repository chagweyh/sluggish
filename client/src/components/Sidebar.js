import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { Dropdown, Image, Icon, Popup } from 'semantic-ui-react';
import styled, { css } from 'styled-components/macro';
import { ListItem, List, Label } from './styles/List';
import AddChannel from './AddChannel';
import { getChannels } from '../API/ChannelsAPI';
import { getUsers } from '../API/UsersAPI';
import { logout } from '../API/AuthAPI';

export default function Sidebar({ user, dispatch }) {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const [channelsResponse, usersResponse] = await Promise.all([
          getChannels(),
          getUsers(),
        ]);
        const users = usersResponse.data.filter(
          (u) => u.username !== user.username,
        );
        setUsers(users);
        setChannels(channelsResponse.data);
      } catch (error) {
        console.error(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user.username]);

  const handleAddChannel = (channel) => {
    setChannels((prevState) => [...prevState, channel]);
  };

  const handleLogout = () => {
    logout();
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <StyledSideBar>
      <Dropdown
        trigger={
          <span>
            <Image avatar src={user.gravatar} />
            {user.username}
          </span>
        }
      >
        <Dropdown.Menu>
          <Dropdown.Item
            text="Account"
            icon="user"
            as={Link}
            to={`/profile/${user.username}`}
          />
          <Dropdown.Item
            text="Settings"
            icon="settings"
            as={Link}
            to="/settings"
          />
          <Dropdown.Item
            text="Sign Out"
            icon="sign out"
            onClick={handleLogout}
          />
        </Dropdown.Menu>
      </Dropdown>

      <ChannelsList>
        <h3>Channels</h3>
        <List>
          {channels.map((channel) => (
            <ListItem key={channel.id}>
              <Link getProps={isActive} to={`/channel/${channel.slug}`}>
                <Icon name={channel.private ? 'lock' : 'hashtag'} />
                {channel.name}
                <Label>0</Label>
              </Link>
            </ListItem>
          ))}
        </List>
      </ChannelsList>
      <AddChannel users={users} handleAddChannel={handleAddChannel} />
      {/* <ChannelsList>
        <h3>Direct Messages</h3>
        <List>
          {channels.map((channel) => (
            <ListItem key={channel.id}>
              <Link to={`/channel/${channel.id}`}>
                <Icon name={channel.private ? 'lock' : 'hashtag'} />
                {channel.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </ChannelsList> */}
    </StyledSideBar>
  );
}

const ChannelsList = styled.div`
  margin: 15px 0;
  h3 {
    margin-bottom: 7px;
  }
`;

const StyledSideBar = styled.div`
  flex-basis: 20%;
  padding: 15px;
  background-color: #2185d0;
  color: #fff;
  & + * {
    flex-basis: 80%;
  }
`;

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active' } : null;
};
