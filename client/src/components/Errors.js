import React from 'react';
import { Message } from 'semantic-ui-react';

const Errors = ({ errors }) => {
  const errorsArray = Object.keys(errors).map(key => errors[key]);
  return <Message error header="There was some errors with your submission" list={errorsArray} />;
};

export default Errors;
