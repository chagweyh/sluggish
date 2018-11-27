import React from 'react';
import Messages from './Messages';
import Input from './Input';

<<<<<<< HEAD
function Content() {
  return (
    <div style={{ width: '83%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Messages />
      <Input />
=======
function Content(props) {
  return (
    <div style={{ width: '83%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Messages messages={props.messages} />
      <Input addMessage={props.addMessage} />
>>>>>>> add-state
    </div>
  );
}

export default Content;
