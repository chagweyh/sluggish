import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import { Dropdown, Image, Icon } from 'semantic-ui-react';
import { StyledSideBar, List, Label } from './style';
import AddChannel from '../AddChannel';
import { getChannels } from '../../API/ChannelsAPI';
import { getUsers } from '../../API/UsersAPI';
import { logout } from '../../API/AuthAPI';

function Sidebar({ user, dispatch }) {
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
      } catch (err) {
        console.error(err);
        setError(err);
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
    navigate('/');
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

      <List>
        <List.Header>Channels</List.Header>
        <List.Body>
          {channels.map((channel) => (
            <List.Item key={channel.id}>
              <Link getProps={isActive} to={`/channel/${channel.slug}`}>
                <Icon name={channel.private ? 'lock' : 'hashtag'} />
                {channel.name}
                {/* <Label>0</Label> */}
              </Link>
            </List.Item>
          ))}
        </List.Body>
      </List>
      <AddChannel users={users} handleAddChannel={handleAddChannel} />
    </StyledSideBar>
  );
}

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: 'active' } : null;
};

export default Sidebar;
