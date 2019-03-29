import React, { useRef, useContext } from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import socket from '../utils/socket';
import API from '../utils/api';
import { UserContext } from '../contexts/user';

const MessageForm = styled(Form)`
  padding: 9px;
  border-top: 1px solid #e8e4e4;
`;

function MessageInput({ channelId }) {
  const input = useRef(null);
  const [user] = useContext(UserContext);
  let timeout;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await API.post('messages', {
        text: input.current.value,
        channel: channelId,
      });
      const message = response.data;
      console.log(message);
      socket.emit('send message', {
        message,
        channelId,
      });
    } catch (error) {
      console.log(error.message);
    }
    input.current.value = '';
  }

  function stoppedTyping() {
    socket.emit('typing', null);
  }

  function handleChange() {
    socket.emit('typing', {
      username: user.username,
      channelId,
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
