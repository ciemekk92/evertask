import styled from 'styled-components';

export const StyledPanelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.surface};
  font-size: 1.6rem;
  padding: 1rem;
  border-radius: 0.3rem;
`;

export const StyledInfoContainer = styled.div`
  display: flex;
  flex-direction: column;

  & > p {
    margin-bottom: 0.3rem;
  }
`;

export const StyledDate = styled.div`
  font-size: 1.3rem;
`;

export const StyledButtonContainer = styled.div`
  display: flex;
`;
