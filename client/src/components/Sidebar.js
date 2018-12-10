import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';
import styled from 'styled-components';
import Channels from './Channels';
import People from './People';
import { getCurrentUser } from '../services/authService';

const trigger = (
  <span>
    <Image avatar src={getCurrentUser() && getCurrentUser().data.gravatar} />{' '}
    {getCurrentUser() && getCurrentUser().data.username}
    {/* <Image avatar src={getCurrentUser().data.gravatar} /> {getCurrentUser().data.username} */}
  </span>
);

const options = [
  { key: 'user', text: 'Account', icon: 'user' },
  // { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out', as: Link, to: '/signout' },
];

const StyledSideBar = styled.div`
  width: 17%;
  padding: 15px;
  background-color: #2185d0;
  color: #fff;
`;

function Sidebar(props) {
  // console.log(getCurrentUser());
  return (
    <StyledSideBar>
      <Dropdown trigger={trigger} options={options} />
      <Channels
        channels={props.channels}
        currentChannel={props.currentChannel}
        handleCurrentChannelChange={props.handleCurrentChannelChange}
      />
      <People />
    </StyledSideBar>
  );
}

export default Sidebar;
