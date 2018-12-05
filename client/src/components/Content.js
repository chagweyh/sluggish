import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';

function Content(props) {
  return (
    <div style={{ width: '83%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Messages messages={props.messages} />
      <MessageInput currentChannel={props.currentChannel} addMessage={props.addMessage} />
    </div>
  );
}

export default Content;
