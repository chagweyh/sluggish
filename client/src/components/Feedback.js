import React, { useState, useEffect } from 'react';
import { Feed } from 'semantic-ui-react';

function Feedback({ text = 'Loading', speed = 300 }) {
  const [content, setContent] = useState(text);
  useEffect(() => {
    const timeout = setInterval(() => {
      setContent(content === text + '...' ? text : content + '.');
    }, speed);

    return () => clearInterval(timeout);
  }, [content]);

  return (
    <Feed.Event>
      <Feed.Content>
        <Feed.Summary>{content}</Feed.Summary>
      </Feed.Content>
    </Feed.Event>
  );
}

export default Feedback;
