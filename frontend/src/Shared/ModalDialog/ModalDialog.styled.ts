import styled from 'styled-components';
import { StyledButtonFilled } from 'Shared/Elements/Buttons/ButtonFilled/ButtonFilled.styled';

export const StyledDialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: ${(props) => props.theme.surface};
  padding: 2rem;
  border-radius: 0.3rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledHeaderWrapper = styled.div`
  display: flex;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${(props) => props.theme.primary};
`;

export const StyledFooterWrapper = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: flex-end;

  & ${StyledButtonFilled} {
    margin-left: 2rem;
  }
`;
