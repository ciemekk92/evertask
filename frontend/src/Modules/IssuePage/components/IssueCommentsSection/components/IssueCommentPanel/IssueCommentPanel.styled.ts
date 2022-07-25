import styled from 'styled-components';

export const StyledCommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surfaceSecondary};

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const StyledCommentHeadingRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const StyledUserField = styled.div`
  display: flex;
  align-items: center;

  & > p {
    margin-left: 1rem;
  }
`;
