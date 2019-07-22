import React, { useRef } from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components/macro';
import socket from '../helpers/socket';
import { addMessage } from '../API/ChannelsAPI';

export default function MessageInput({ channel, user }) {
  const input = useRef(null);
  let timeout;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addMessage(channel.id, input.current.value);
      const message = response.data;
      console.log(message);
      socket.emit('send message', {
        message,
        sentFrom: channel.slug,
      });
    } catch (error) {
      console.log(error.message);
    }
    input.current.value = '';
  };

  const stoppedTyping = () => {
    socket.emit('typing', null);
  };

  const handleChange = () => {
    socket.emit('typing', {
      username: user.username,
      sentFrom: channel.slug,
    });
    clearTimeout(timeout);
    timeout = setTimeout(stoppedTyping, 2000);
  };

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

const MessageForm = styled(Form)`
  padding: 9px;
  border-top: 1px solid #e8e4e4;
`;
