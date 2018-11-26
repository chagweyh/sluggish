import React from 'react';
import Sidebar from './Sidebar';
import Content from './Content';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Content />
    </div>
  );
}

export default App;
