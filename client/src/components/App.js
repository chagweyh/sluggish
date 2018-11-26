import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

function App() {
  const [channels, setChannels] = useState(null);
  const [currentChannel, setCurrentChannel] = useState('channel1');
  const prevChannels = (channels && channels[currentChannel]) || [];

  function handleAddMessage(message) {
    const updatedChannels = { ...channels, [currentChannel]: [...prevChannels, message] };
    setChannels(updatedChannels);
  }

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar channels={channels} currentChannel={currentChannel} />
      <Content messages={prevChannels} addMessage={handleAddMessage} />
    </div>
  );
}

export default App;
