import React from 'react';
import { Box } from './styles/Box';
import { List, ListItem } from './styles/List';

function DirectChat() {
  return (
    <Box>
      <h3>Direct Messages</h3>
      <List>
        <ListItem>Person1</ListItem>
        <ListItem>Person2</ListItem>
        <ListItem>Person3</ListItem>
        <ListItem>Person4</ListItem>
      </List>
    </Box>
  );
}

export default DirectChat;
