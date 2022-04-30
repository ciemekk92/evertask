import styled from 'styled-components';

export const StyledPanelContainer = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  background-color: ${(props) => props.theme.surfaceSecondary};
  border-radius: 0.3rem;

  &:not(:last-child) {
    margin-bottom: 0.3rem;
  }
`;

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;

  & > p {
    margin-bottom: 0.3rem;
  }

  & > span {
    font-size: 1.1rem;
  }
`;
