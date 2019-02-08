import React from 'react';
import styled from 'styled-components';
import MessageInput from './MessageInput';
import Messages from './Messages';

const StyledContent = styled.div`
  flex: 0 0 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function Main({ currentChannel, messages }) {
  return (
    <StyledContent>
      <Messages currentChannel={currentChannel} messages={messages} />
      <MessageInput currentChannel={currentChannel} />
    </StyledContent>
  );
}

export default Main;
