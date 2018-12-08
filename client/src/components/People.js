import React from 'react';
// import { List } from 'semantic-ui-react';
import { Box, BoxHeader } from './styles/Box';
import { List, ListItem } from './styles/List';

function People() {
  return (
    <Box>
      <BoxHeader>Direct Message</BoxHeader>
      <List>
        <ListItem>Person1</ListItem>
        <ListItem>Person2</ListItem>
        <ListItem>Person3</ListItem>
        <ListItem>Person4</ListItem>
      </List>
    </Box>
  );
}

export default People;
