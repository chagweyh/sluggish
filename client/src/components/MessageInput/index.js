import React, { useRef } from 'react';
import styled from '@emotion/styled';
import socket from '../../helpers/socket';
import { addMessage } from '../../API/ChannelsAPI';

function MessageInput({ channel, user }) {
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
    } catch (err) {
      console.log(err.message);
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
        placeholder={`Message #${channel.name}`}
      />
    </MessageForm>
  );
}

const MessageForm = styled.form`
  padding: 9px;
  border-top: 1px solid #e8e4e4;
  input {
    width: 100%;
    padding: 8px;
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 5px;
  }
`;

export default MessageInput;
