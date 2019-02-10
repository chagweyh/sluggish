import React, { Fragment } from 'react';
import { Box } from './styles/Box';
import { List } from './styles/List';

function Channels({ children }) {
  return (
    <Fragment>
      <Box>
        <h3>Channels</h3>
        <List>{children}</List>
      </Box>
    </Fragment>
  );
}

export default Channels;
