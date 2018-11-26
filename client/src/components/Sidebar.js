import React from 'react';
import Channels from './Channels';
import People from './People';

function Sidebar() {
  return (
    <div
      style={{
        width: '17%',
        padding: '15px',
        backgroundColor: '#3b5998',
        color: '#fff',
      }}
    >
      <Channels />
      <People />
    </div>
  );
}

export default Sidebar;
