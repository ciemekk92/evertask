import styled from 'styled-components';

export const StyledPanelContainer = styled.div`
  display: flex;
  padding: 1rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const StyledNameLabel = styled.div`
  font-size: 1.6rem;
`;
