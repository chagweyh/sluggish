import React, { useState } from 'react';

function generateId() {
  return Math.random()
    .toString(36)
    .substring(2);
}

function Input(props) {
  const [text, setText] = useState('');
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      props.addMessage({
        id: generateId(),
        text,
        author: 'Me',
        image: null,
        date: new Date(),
      });
      setText('');
    }
  }
  return (
    <div style={{ padding: '9px', borderTop: '1px solid #e8e4e4' }}>
<<<<<<< HEAD
      <input type="text" placeholder="Type your message here. Press Enter to send" />
=======
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type your message here. Press Enter to send"
        onKeyPress={handleKeyPress}
      />
>>>>>>> add-state
    </div>
  );
}

export default Input;
