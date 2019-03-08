import styled, { css } from 'styled-components';

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  a {
    padding: 4px;
    color: #fff;
    display: block;
    ${(props) =>
      props.active &&
      css`
        background: #f1c40f;
        color: #000;
      `}
  }
`;

export { List, ListItem };
