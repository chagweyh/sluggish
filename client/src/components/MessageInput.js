import React, { useState } from 'react';
import { Input } from 'semantic-ui-react';
import styled from 'styled-components';
import axios from 'axios';
import { getCurrentUser } from '../services/authService';

function generateId() {
  return Math.random()
    .toString(36)
    .substring(2);
}

const StyledInput = styled(Input)`
  &&& {
    padding: 9px;
    border-top: 1px solid #e8e4e4;
  }
`;

function MessageInput(props) {
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
        author: getCurrentUser().data._id,
        // channel: props.currentChannel,
        channel: '5c0f746143fe7e3258bee010',
      });
      setText('');
    }
  }
  return (
    // <StyledInput placeholder="Type your message here. Press Enter to send" />
    <StyledInput
      name="text"
      type="text"
      value={text}
      onChange={e => setText(e.target.value)}
      placeholder="Type your message here. Press Enter to send"
      onKeyPress={handleKeyPress}
    />
    //   <div style={{ padding: '9px', borderTop: '1px solid #e8e4e4' }}>
    //   <input
    //     name="text"
    //     type="text"
    //     value={text}
    //     onChange={e => setText(e.target.value)}
    //     placeholder="Type your message here. Press Enter to send"
    //     onKeyPress={handleKeyPress}
    //   />
    // </div>
  );
}

export default MessageInput;
