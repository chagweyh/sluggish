import styled from '@emotion/styled';

export const StyledMessages = styled.div`
  padding: 10px 20px;
  overflow-y: auto;
  height: calc(100% - 55px);
  display: flex;
  flex-direction: column;
`;

export const Message = styled.div`
  display: flex;
  margin: ${(props) => (props.withAvatar ? '10px 0 5px 0' : '5px 0 5px 52px')};
`;

Message.Avatar = styled.img`
  max-height: 40px;
  border-radius: 4px;
`;

Message.Info = styled.div`
  margin-left: 12px;
  span {
    display: inline-block;
  }
`;

Message.Author = styled.span`
  font-weight: bold;
  font-size: 15px;
`;

Message.Date = styled.span`
  font-size: 14px;
  margin-left: 10px;
  color: #99a5b1;
`;

Message.Text = styled.p`
  margin: 0;
  font-size: 15px;
`;

export const Day = styled.div`
  display: flex;
  align-items: center;
`;

Day.Line = styled.div`
  flex: 1;
  height: 1px;
  background: #ccc;
`;

Day.Text = styled.div`
  font-weight: bold;
  padding: 10px;
`;
