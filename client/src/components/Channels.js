import React from 'react';
import { List, ListItem } from './styles/List';
import { Box, BoxHeader } from './styles/Box';

function Channels({ currentChannel, channels, handleCurrentChannelChange }) {
  return (
    <Box>
      <BoxHeader>Channels</BoxHeader>
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
