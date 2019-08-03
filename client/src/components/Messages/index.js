import React, { useEffect, useRef, Fragment } from 'react';
import { format, isSameDay, differenceInSeconds } from 'date-fns';
import Feedback from '../Feedback';
import { StyledMessages, Message, Day } from './style';

function Messages({ messages, info }) {
  const messagesEl = useRef(null);
  useEffect(() => {
    // scroll to the bottom
    messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
  });

  return (
    <StyledMessages ref={messagesEl}>
      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const showDay = shouldShowDay(previous, message);
        const showAvatar = shouldShowAvatar(previous, message);
        return showAvatar ? (
          <FirstMessageFromUser
            key={message._id}
            message={message}
            showDay={showDay}
          />
        ) : (
          <Message key={message._id}>
            <Message.Text>{message.text}</Message.Text>
          </Message>
        );
      })}
      {info && <Feedback text={info} />}
    </StyledMessages>
  );
}

const FirstMessageFromUser = ({ message, showDay }) => (
  <Fragment>
    {showDay && (
      <Day>
        <Day.Line />
        <Day.Text>{format(message.createdAt, 'dddd, MMMM Do')}</Day.Text>
        <Day.Line />
      </Day>
    )}
    <Message withAvatar>
      <Message.Avatar src={message.createdBy.gravatar} />
      <Message.Info>
        <Message.Author>{message.createdBy.username}</Message.Author>
        <Message.Date>{format(message.createdAt, 'h:mm A')}</Message.Date>
        <Message.Text>{message.text}</Message.Text>
      </Message.Info>
    </Message>
  </Fragment>
);

function shouldShowAvatar(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const differentUser = message.createdBy._id !== previous.createdBy._id;
  if (differentUser) {
    return true;
  }

  const hasBeenAWhile =
    differenceInSeconds(message.createdAt, previous.createdAt) > 180;

  return hasBeenAWhile;
}

function shouldShowDay(previous, message) {
  const isFirst = !previous;
  if (isFirst) {
    return true;
  }

  const isNewDay = !isSameDay(message.createdAt, previous.createdAt);

  return isNewDay;
}

export default Messages;
