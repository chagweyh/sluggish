import React from 'react';
import Messages from './Messages';
import Input from './Input';

function Content() {
  return (
    <div style={{ width: '83%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Messages />
      <Input />
    </div>
  );
}

export default Content;
