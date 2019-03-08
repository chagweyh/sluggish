import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Loading from './Loading';
import ChannelInfo from './ChannelInfo';
import Messages from './Messages';
import styled, { css } from 'styled-components/macro';
import MessageInput from './MessageInput';
import socket from '../utils/socket';
import { Loader } from 'semantic-ui-react';
import { Placeholder } from 'semantic-ui-react';

const PlaceholderExample = () => (
  <Placeholder>
    <Placeholder.Header image>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
);

const Main = styled.div`
  flex: 0 0 80%;
`;

const ChannelContent = styled.div`
  height: 100vh;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const ChannelDetails = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

function Channel({ match }) {
  const [channel, setChannel] = useState(null);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const channelId = match.params.channelId;

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await axios.get(`/api/channels/${channelId}`);
        setChannel(response.data);
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchChannelData();
  }, [channelId]);

  useEffect(() => {
    socket.on('send message', (data) => {
      if (channel && data.channelId === channelId) {
        const updatedMessages = [...channel.messages, data.message];
        setChannel((prevState) => ({ ...prevState, messages: updatedMessages }));
      }
    });
  });

  useEffect(() => {
    socket.on('typing', (data) => {
      if (!data) {
        setInfo(null);
      } else {
        // const { username, channel } = data;
        // verify if the sender and the receiver of
        // the message are on the same channel or not
        data.channelId === channelId ? setInfo(`${data.username} is typing a message`) : setInfo(null);
      }
    });
  });

  if (isError) {
    return <div>something went wrong...</div>;
  }

  return (
    <Main>
      {isLoading ? (
        <PlaceholderExample />
      ) : (
        <ChannelContent>
          <ChannelInfo channel={channel} />
          <ChannelDetails>
            <Messages info={info} channelId={channelId} messages={channel.messages} />
            <MessageInput channelId={channelId} />
          </ChannelDetails>
        </ChannelContent>
      )}
    </Main>
  );
}

export default Channel;
