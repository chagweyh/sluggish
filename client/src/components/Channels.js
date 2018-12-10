import React from 'react';
import { List, ListItem } from './styles/List';
import { Box } from './styles/Box';

function Channels({ currentChannel, channels, handleCurrentChannelChange }) {
  return (
    <Box>
      <h3>Channels</h3>
      <List>
        {channels.map(channel => (
          <ListItem
            key={channel}
            active={channel === currentChannel}
            onClick={() => handleCurrentChannelChange(channel)}
          >
            # {channel}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Channels;
