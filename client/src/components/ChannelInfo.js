import React, { useState } from 'react';
import styled, { css } from 'styled-components/macro';
import { Popup, Icon, Input, Dropdown } from 'semantic-ui-react';
import { useAppState } from '../contexts/user';
import { starChannel } from '../API/ChannelsAPI';

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
  const {
    state: { user },
    dispatch,
  } = useAppState();
  const [starred, setStarred] = useState(
    user.stars && user.stars.includes(channel.id),
  );

  const handleStarClick = async () => {
    try {
      starred
        ? dispatch({ type: 'UNSTAR_CHANNEL', channel: channel.id })
        : dispatch({ type: 'STAR_CHANNEL', channel: channel.id });
      setStarred(!starred);
      await starChannel(channel.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDropdownClick = (e) => {
    console.log(e);
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
            <Icon
              color={details ? 'blue' : 'black'}
              name="info circle"
              size="large"
              link
              onClick={handleClick}
            />
          }
          content={details ? 'Hide Channel Details' : 'Show Channel Details'}
        />
        {/* <Icon name="setting" size="large" link /> */}
        <Dropdown icon="setting" size="large" className="icon">
          <Dropdown.Menu onClick={handleDropdownClick}>
            <Dropdown.Item icon="edit" text="Edit channel" />
            <Dropdown.Item icon="edit" text="Invite new members to join..." />
            <Dropdown.Item icon="trash" text="Leave channel" />
            <Dropdown.Item icon="trash" text="Delete channel" />
          </Dropdown.Menu>
        </Dropdown>
        <Input icon="search" iconPosition="left" placeholder="Search..." />
      </div>
    </StyledInfo>
  );
}

export default ChannelInfo;
