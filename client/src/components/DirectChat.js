import React from 'react';
import { Box } from './styles/Box';
import { List, ListItem } from './styles/List';

function DirectChat({ users }) {
  return (
    <Box>
      <h3>Direct Messages</h3>
      <List>
        {users.map(user => (
          <ListItem key={user._id}>{user.username}</ListItem>
        ))}
      </List>
    </Box>
  );
}

export default DirectChat;
