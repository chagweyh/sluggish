import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import Channels from './Channels';
import DirectChat from './DirectChat';
import { ListItem } from './styles/List';
import { getCurrentUser } from '../utils/auth';

const trigger = (
  <span>
    <Image avatar src={getCurrentUser() && getCurrentUser().data.gravatar} />{' '}
    {getCurrentUser() && getCurrentUser().data.username}
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

function Sidebar({ channels, currentChannel, handleCurrentChannelChange }) {
  console.log(channels);
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
            # {channelName}
          </ListItem>
        ))}
      </Channels>
      <DirectChat />
    </StyledSideBar>
  );
}

export default Sidebar;
