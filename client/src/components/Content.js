import React from 'react';
import Messages from './Messages';
import Input from './Input';

function Content(props) {
  return (
    <div style={{ width: '83%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Messages messages={props.messages} />
      <Input addMessage={props.addMessage} />
    </div>
  );
}

export default Content;
