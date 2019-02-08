import React, { Fragment } from 'react';
import { Box } from './styles/Box';
import { List } from './styles/List';
import AddChannel from './AddChannel';

function Channels({ children }) {
  return (
    <Fragment>
      <Box>
        <h3>Channels</h3>
        <List>{children}</List>
      </Box>
      <AddChannel />
    </Fragment>
  );
}

export default Channels;
