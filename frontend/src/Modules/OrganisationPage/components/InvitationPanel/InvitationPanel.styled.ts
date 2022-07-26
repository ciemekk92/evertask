import styled from 'styled-components';
import {
  StyledFlexColumnContainer,
  StyledFlexContainerSpaceBetween
} from 'Shared/SharedStyles.styled';

export const StyledPanelContainer = styled(StyledFlexContainerSpaceBetween)`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.surfaceSecondary};
  border-radius: 0.3rem;

  &:not(:last-child) {
    margin-bottom: 0.3rem;
  }
`;

export const StyledInfoContainer = styled(StyledFlexColumnContainer)`
  font-size: 1.6rem;

  & > p {
    margin-bottom: 0.3rem;
  }

  & > span {
    font-size: 1.1rem;
  }
`;
