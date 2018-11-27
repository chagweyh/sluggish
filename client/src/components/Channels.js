import React from 'react';

function Channels(props) {
  return (
    <div>
      <h3>Channels</h3>
      <ul>
        {props.channels.map(channel => (
          <li
            key={channel}
            className={channel === props.currentChannel ? 'active' : ''}
            onClick={() => props.handleCurrentChannelChange(channel)}
          >
            # {channel}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Channels;
