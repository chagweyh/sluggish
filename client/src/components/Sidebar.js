import React from 'react';
import Channels from './Channels';
import People from './People';

function Sidebar(props) {
  return (
    <div
      style={{
        width: '17%',
        padding: '15px',
        backgroundColor: '#2185d0',
        color: '#fff',
      }}
    >
      <Channels
        channels={props.channels}
        currentChannel={props.currentChannel}
        handleCurrentChannelChange={props.handleCurrentChannelChange}
      />
      <People />
    </div>
  );
}

export default Sidebar;
