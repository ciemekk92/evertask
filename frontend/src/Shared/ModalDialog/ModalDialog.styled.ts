import styled from 'styled-components';
import { StyledButtonFilled } from 'Shared/Elements/Buttons/ButtonFilled/ButtonFilled.styled';
import { StyledFlexColumnContainer, StyledFlexContainer } from 'Shared/SharedStyles.styled';

export const StyledDialogWrapper = styled(StyledFlexColumnContainer)`
  position: absolute;
  background-color: ${(props) => props.theme.surface};
  padding: 2rem;
  border-radius: 0.3rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledHeaderWrapper = styled(StyledFlexContainer)`
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${(props) => props.theme.primary};
`;

export const StyledFooterWrapper = styled(StyledFlexContainer)`
  margin-top: 1.5rem;
  justify-content: flex-end;

  & ${StyledButtonFilled} {
    margin-left: 2rem;
  }
`;
