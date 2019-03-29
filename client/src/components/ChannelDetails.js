import React from 'react';
import { Placeholder, Icon } from 'semantic-ui-react';
import { format } from 'date-fns';
import styled, { css } from 'styled-components/macro';

const Header = styled.div`
  background: #f3f4f5;
  padding: 15px;
  display: flex;
  border-bottom: 1px solid #d4d4d5;
  h3 {
    margin-right: auto;
    margin-bottom: 0;
  }
`;

function ChannelDetails({ channel, handleClick }) {
  return (
    <div
      css={`
        flex-basis: 25%;
        border-left: 1px solid #e8e4e4;
      `}
    >
      <Header>
        <h3>About #{channel.name}</h3>
        <Icon link name="close" size="large" onClick={handleClick} />
      </Header>
      <div
        css={`
          padding: 15px;
        `}
      >
        <div>
          <h4>Purpose</h4>
          <p>{channel.purpose}</p>
        </div>
        <div>
          <h4>Created</h4>
          <p>
            Created by {channel.createdBy.username} on {format(new Date(channel.createdAt), 'MMMM DD, YYYY')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChannelDetails;
