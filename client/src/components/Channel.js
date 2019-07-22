import React, { useState, useEffect } from 'react';
import ChannelInfo from './ChannelInfo';
import Messages from './Messages';
import styled, { css } from 'styled-components/macro';
import MessageInput from './MessageInput';
import socket from '../helpers/socket';
import { Placeholder } from 'semantic-ui-react';
import ChannelDetails from './ChannelDetails';
import { getChannel } from '../API/ChannelsAPI';

const PlaceholderExample = () => (
  <Placeholder>
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
    <Placeholder.Line />
  </Placeholder>
);

const StyledChannel = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ChannelContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  justify-content: flex-end;
  ${(props) =>
    props.details &&
    css`
      flex-basis: 75%;
    `};
`;

function Channel({ slug, user }) {
  const [channel, setChannel] = useState(null);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [details, setDetails] = useState(true);

  const toggleDetails = () => setDetails(!details);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await getChannel(slug);
        setChannel(response.data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChannelData();
  }, [slug]);

  useEffect(() => {
    if (channel) {
      document.title = `${channel.name} | Mini Slack Clone`;
    }
  }, [channel]);

  useEffect(() => {
    socket.on('send message', (data) => {
      if (channel && data.sentFrom === slug) {
        const updatedMessages = [...channel.messages, data.message];
        setChannel((prevState) => ({
          ...prevState,
          messages: updatedMessages,
        }));
      }
    });
  });

  useEffect(() => {
    socket.on('typing', (data) => {
      if (!data) {
        setInfo(null);
      } else {
        // verify if the sender and the receiver of
        // the message are on the same channel or not
        data.sentFrom === slug
          ? setInfo(`${data.username} is typing a message`)
          : setInfo(null);
      }
    });
  });

  if (isError) {
    return <div>something went wrong...</div>;
  }

  return isLoading ? (
    <PlaceholderExample />
  ) : (
    <StyledChannel>
      <ChannelInfo
        channel={channel}
        details={details}
        handleClick={toggleDetails}
        user={user}
      />
      <div
        css={`
          display: flex;
          flex-direction: row;
          height: inherit;
        `}
      >
        <ChannelContent details={details}>
          <Messages info={info} messages={channel.messages} />
          <MessageInput channel={channel} user={user} />
        </ChannelContent>
        {details && (
          <ChannelDetails channel={channel} handleClick={toggleDetails} />
        )}
      </div>
    </StyledChannel>
  );
}

export default Channel;
