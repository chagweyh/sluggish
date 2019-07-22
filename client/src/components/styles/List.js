import styled, { css } from 'styled-components/macro';

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const Label = styled.div`
  float: right;
  padding: 0 6px;
  border-radius: 7px;
  border-style: solid;
  border-width: 1px;
`;

export const ListItem = styled.li`
  a {
    padding: 4px;
    color: #fff;
    display: block;
    &:hover,
    &.active {
      background: #f1c40f;
      color: #000;
      ${Label} {
        border-color: #000;
      }
    }
  }
  ${Label} {
    border-color: ${(props) => (props.active ? '#000' : '#fff')};
  }
`;
