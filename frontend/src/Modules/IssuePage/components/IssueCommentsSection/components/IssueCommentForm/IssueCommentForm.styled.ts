import styled from 'styled-components';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';

export const StyledButtonsContainer = styled(StyledFlexContainer)`
  margin: 0 0 1rem auto;
  padding: 0 1rem;

  & > button:first-child {
    margin-right: 1rem;
  }
`;
