import styled from 'styled-components';
import { StyledButtonFilled } from 'Shared/Elements/Buttons/ButtonFilled/ButtonFilled.styled';

export const StyledInterfaceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  height: max-content;
  padding: 2rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};
`;

export const StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const StyledButtonsContainer = styled.div`
  margin-left: auto;
  display: flex;

  & ${StyledButtonFilled} {
    margin-right: 1rem;
  }
`;
