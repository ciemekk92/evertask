import styled from 'styled-components';
import { StyledButtonFilled } from 'Shared/Elements/Buttons/ButtonFilled/ButtonFilled.styled';
import {
  StyledFlexColumnContainerAlignCenter,
  StyledFlexContainer,
  StyledFlexContainerSpaceBetween
} from 'Shared/SharedStyles.styled';

export const StyledInterfaceContainer = styled(StyledFlexColumnContainerAlignCenter)`
  width: 100%;
  height: max-content;
  padding: 2rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};
`;

export const StyledHeaderContainer = styled(StyledFlexContainerSpaceBetween)`
  margin-bottom: 1.5rem;
`;

export const StyledButtonsContainer = styled(StyledFlexContainer)`
  margin-left: auto;

  & ${StyledButtonFilled} {
    margin-right: 1rem;
  }
`;
