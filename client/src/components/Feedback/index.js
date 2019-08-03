import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

function Feedback({ text = 'Loading', speed = 300 }) {
  const [content, setContent] = useState(text);
  useEffect(() => {
    const timeout = setInterval(() => {
      setContent(content === text + '...' ? text : content + '.');
    }, speed);

    return () => clearInterval(timeout);
  }, [content, speed, text]);

  return <FeedbackText>{content}</FeedbackText>;
}

const FeedbackText = styled.div`
  margin-top: auto;
  font-style: italic;
`;

export default Feedback;
