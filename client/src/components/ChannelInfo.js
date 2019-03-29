import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components/macro';
import { Popup, Icon, Input } from 'semantic-ui-react';
import { UserContext } from '../contexts/user';
import API from '../utils/api';

const StyledInfo = styled.div`
  position: sticky;
  padding: 10px 20px;
  border-bottom: 1px solid #e8e4e4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
  }
`;

function ChannelInfo({ channel, details, handleClick }) {
  const [user, dispatch] = useContext(UserContext);
  const [starred, setStarred] = useState(user.stars && user.stars.includes(channel.id));
  const handleStarClick = async () => {
    try {
      starred
        ? dispatch({ type: 'UNSTAR_CHANNEL', channel: channel.id })
        : dispatch({ type: 'STAR_CHANNEL', channel: channel.id });
      setStarred(!starred);
      await API.post(`channels/${channel.id}/star`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <StyledInfo>
      <div>
        <h3
          css={`
            margin-right: 5px;
            margin-bottom: 0;
          `}
        >
          #{channel.name}
        </h3>
        <Popup
          inverted
          trigger={
            <Icon
              color={starred ? 'yellow' : 'black'}
              name={starred ? 'star' : 'star outline'}
              onClick={handleStarClick}
            />
          }
          content={starred ? 'Unstar this channel' : 'Star this Channel'}
        />
        &#124;
        <Icon name="user outline" link /> 98
      </div>
      <div>
        <Popup
          inverted
          trigger={
            <Icon color={details ? 'blue' : 'black'} name="info circle" size="large" link onClick={handleClick} />
          }
          content={details ? 'Hide Channel Details' : 'Show Channel Details'}
        />
        <Icon name="setting" size="large" link />
        <Input icon="search" iconPosition="left" placeholder="Search..." />
      </div>
    </StyledInfo>
  );
}

export default ChannelInfo;
