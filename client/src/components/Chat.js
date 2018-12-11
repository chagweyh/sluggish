import React, { useState, useEffect, useReducer } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { getCurrentUser } from '../services/authService';
import Sidebar from './Sidebar';
import Content from './Content';

function Chat() {
  const [currentChannel, setCurrentChannel] = useState('general');

  const [channels, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'add_channel':
          return { ...state, [action.name]: [] };
        case 'add_message':
          return { ...state, [currentChannel]: [...state[currentChannel], action.message] };
        default:
          return state;
      }
    },
    { general: [] }
  );

  useEffect(() => {
    axios
      .get('/api/channels')
      .then(res => res.data)
      .then(channels => {
        console.log(channels);
        channels.forEach(channel => dispatch({ type: 'add_channel', name: channel.name }));
      });
  }, []);

  const messages = (channels && channels[currentChannel]) || [];

  if (!getCurrentUser()) return <Redirect to="/" />;
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar
        channels={(channels && Object.keys(channels)) || []}
        currentChannel={currentChannel}
        handleCurrentChannelChange={channel => setCurrentChannel(channel)}
      />
      <Content
        currentChannel={currentChannel}
        messages={messages}
        addMessage={message => dispatch({ type: 'add_message', message })}
      />
    </div>
  );
}

export default Chat;
