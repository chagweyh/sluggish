import styled from '@emotion/styled';

export const StyledSideBar = styled.div`
  flex-basis: 20%;
  padding: 15px;
  background-color: #2185d0;
  color: #fff;
  & + * {
    flex-basis: 80%;
  }
`;

export const Label = styled.div`
  float: right;
  padding: 0 6px;
  border-radius: 7px;
  border-style: solid;
  border-width: 1px;
`;

export const List = styled.div`
  margin: 15px 0;
`;

List.Header = styled.h3`
  margin-bottom: 7px;
`;

List.Body = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

List.Item = styled.li`
  a {
    padding: 4px;
    color: #fff;
    display: block;
    &:hover,
    &.active {
      background: #f1c40f;
      color: #000;
    }
  }
`;

// List.Item = styled.li`
//   a {
//     padding: 4px;
//     color: #fff;
//     display: block;
//     &:hover,
//     &.active {
//       background: #f1c40f;
//       color: #000;
//       ${Label} {
//         border-color: #000;
//       }
//     }
//   }
//   ${Label} {
//     border-color: ${(props) => (props.active ? '#000' : '#fff')};
//   }
// `;
