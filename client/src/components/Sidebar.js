import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image, Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import Channels from './Channels';
import DirectChat from './DirectChat';
import { ListItem } from './styles/List';
import { getCurrentUser } from '../utils/auth';
import AddChannel from './AddChannel';

const trigger = (
  <span>
    <Image avatar src={getCurrentUser() && getCurrentUser().gravatar} />
    {getCurrentUser() && getCurrentUser().username}
  </span>
);

const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  // { key: 'settings', text: 'Settings', icon: 'settings' },
  {
    key: 'sign-out',
    text: 'Sign Out',
    icon: 'sign out',
    as: Link,
    to: '/signout',
  },
];

const StyledSideBar = styled.div`
  flex: 0 0 20%;
  padding: 15px;
  color: #fff;
  background-color: #2185d0;
`;

function Sidebar({ users, channels, currentChannel, handleCurrentChannelChange, handleAddChannel }) {
  return (
    <StyledSideBar>
      <Dropdown trigger={trigger} options={options} />
      <Channels>
        {Object.keys(channels).map((channelName, index) => (
          <ListItem
            key={channels[channelName].id}
            active={channelName === currentChannel}
            onClick={() => handleCurrentChannelChange(channelName)}
          >
            <Icon name={channels[channelName].private ? 'lock' : 'hashtag'} />
            {channelName}
          </ListItem>
        ))}
      </Channels>
      <AddChannel users={users} handleAddChannel={handleAddChannel} />
      <DirectChat users={users} />
    </StyledSideBar>
  );
}

export default Sidebar;
