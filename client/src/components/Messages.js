import React from 'react';

function Messages(props) {
  const messages = props.messages || [];
  return (
    <div
      style={{
        padding: '0px 20px',
        overflowY: 'auto',
      }}
    >
      {messages.map(message => (
        <div key={message.id} className="message">
          <div className="user-img">
            <img
              src={message.img ? message.img : 'https://avatars0.githubusercontent.com/u/23120626?s=400&v=4'}
              alt={message.author + ' image'}
            />
          </div>
          <div className="message-info">
            <span className="user-name">{message.author}</span>
            <span className="message-date">{message.date.toString()}</span>
            <p className="message-text">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Messages;
