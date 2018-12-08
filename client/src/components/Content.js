import React from 'react';
import Messages from './Messages';
import MessageInput from './MessageInput';
import styled from 'styled-components';

const StyledContent = styled.div`
  width: 83%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function Content(props) {
  return (
    <StyledContent>
      <Messages messages={props.messages} />
      <MessageInput currentChannel={props.currentChannel} addMessage={props.addMessage} />
    </StyledContent>
  );
}

export default Content;
