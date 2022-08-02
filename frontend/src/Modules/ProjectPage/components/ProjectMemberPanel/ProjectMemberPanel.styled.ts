import styled from 'styled-components';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';

export const StyledPanelContainer = styled(StyledFlexContainer)`
  padding: 1rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const StyledNameLabel = styled.div`
  font-size: 1.6rem;
`;
