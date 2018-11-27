import React, { useState } from 'react';
import axios from 'axios';

function generateId() {
  return Math.random()
    .toString(36)
    .substring(2);
}

function Input(props) {
  const [text, setText] = useState('');
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      // props.addMessage({
      //   id: generateId(),
      //   text,
      //   author: 'Me',
      //   image: null,
      //   date: new Date(),
      // });
      axios.post('/api/messages', {
        text,
        author: 'Me',
        channel: props.currentChannel,
      });
      setText('');
    }
  }
  return (
    <div style={{ padding: '9px', borderTop: '1px solid #e8e4e4' }}>
      <input
        name="text"
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type your message here. Press Enter to send"
        onKeyPress={handleKeyPress}
      />
    </div>
  );
}

export default Input;
