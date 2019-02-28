import axios from 'axios';
import React, { useRef } from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import { getCurrentUser, getJwt } from '../utils/auth';
import socket from '../utils/socket';

const MessageForm = styled(Form)`
  padding: 9px;
  border-top: 1px solid #e8e4e4;
`;

function MessageInput({ currentChannel }) {
  const input = useRef(null);
  let timeout;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/api/messages',
        {
          text: input.current.value,
          author: getCurrentUser().data._id,
          channel: currentChannel._id,
        },
        {
          headers: {
            'x-auth-token': getJwt(),
          },
        },
      );
      const message = response.data;
      socket.emit('send message', {
        message,
        channel: currentChannel.name,
      });
    } catch (error) {
      console.log(error);
    }
    input.current.value = '';
  }

  function stoppedTyping() {
    socket.emit('typing', null);
  }

  function handleChange() {
    socket.emit('typing', {
      username: getCurrentUser().data.username,
      channel: currentChannel.name,
    });
    clearTimeout(timeout);
    timeout = setTimeout(stoppedTyping, 2000);
  }

  return (
    <MessageForm onSubmit={handleSubmit} autoComplete="off">
      <input
        type="text"
        name="message"
        ref={input}
        onChange={handleChange}
        placeholder="Type your message here. Press Enter to send"
      />
    </MessageForm>
  );
}

export default MessageInput;
