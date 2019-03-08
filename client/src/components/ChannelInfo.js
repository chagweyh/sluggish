import React from 'react';
import styled from 'styled-components';

const StyledInfo = styled.div`
  position: sticky;
  padding: 10px;
  border-bottom: 1px solid #e8e4e4;
`;

function ChannelInfo({ channel }) {
  return (
    <StyledInfo>
      <h3>#{channel.name}</h3>
    </StyledInfo>
  );
}

export default ChannelInfo;
