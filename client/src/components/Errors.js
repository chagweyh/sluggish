import React from 'react';
import { Message } from 'semantic-ui-react';

const Errors = ({ errors }) => {
  return (
    <Message
      error
      header="There was some errors with your submission"
      list={errors}
    />
  );
};

export default Errors;
