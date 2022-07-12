import styled from 'styled-components';
import { StyledButtonFilled } from 'Shared/Elements/Buttons/ButtonFilled/ButtonFilled.styled';
import { StyledCircleContainer } from 'Shared/UserCircle/UserCircle.styled';
import { StyledErrorField } from 'Shared/Elements/ErrorField/ErrorField';

export const StyledAvatarSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 39%;
  height: max-content;
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};

  & > h6 {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  & ${StyledButtonFilled}, & ${StyledCircleContainer} {
    margin-bottom: 2rem;
  }
`;

export const StyledAvatarDisclaimer = styled.p`
  font-size: 1.4rem;
`;

export const StyledVerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & ${StyledErrorField} {
    margin: 1rem 0;
  }
`;
