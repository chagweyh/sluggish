import styled, { css } from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  cursor: pointer;
  padding: 4px;
  ${(props) =>
    props.active &&
    css`
      background: #f1c40f;
      color: #000;
    `}
`;

export { List, ListItem };
