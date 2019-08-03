import React from 'react';
import { Icon } from 'semantic-ui-react';
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { format } from 'date-fns';

function ChannelDetails({ channel, handleClick }) {
  return (
    <div
      css={css`
        flex-basis: 25%;
        border-left: 1px solid #e8e4e4;
      `}
    >
      <Header>
        <h3>About #{channel.name}</h3>
        <Icon link name="close" size="large" onClick={handleClick} />
      </Header>
      <div
        css={css`
          padding: 15px;
        `}
      >
        <Detail title="Purpose">{channel.purpose}</Detail>
        <Detail title="Created">
          Created by {channel.createdBy.username} on{' '}
          {format(new Date(channel.createdAt), 'MMMM DD, YYYY')}
        </Detail>
      </div>
    </div>
  );
}

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

const Detail = ({ title, children }) => (
  <div
    css={css`
      margin-bottom: 15px;
    `}
  >
    <h4
      css={css`
        color: rgba(29, 28, 29, 0.7);
        font-size: 13px;
        margin-bottom: 5px;
      `}
    >
      {title}
    </h4>
    <p>{children}</p>
  </div>
);

export default ChannelDetails;
