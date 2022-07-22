import styled from 'styled-components';

export const StyledField = styled.div`
  display: flex;
  font-size: 1.6rem;
  padding: 1rem;
  width: 100%;
  height: 4rem;
  align-items: center;

  & > p {
    display: flex;
    align-items: center;

    & > span {
      margin-right: 1rem;
    }
  }

  & > a {
    &,
    &:visited,
    &:focus {
      color: ${(props) => props.theme.primaryText};
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
`;

export const StyledFieldLabel = styled.strong`
  width: 50%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
