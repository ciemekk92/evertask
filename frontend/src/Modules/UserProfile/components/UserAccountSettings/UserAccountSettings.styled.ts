import styled from 'styled-components';
import { StyledButtonFilled } from 'Shared/Elements/Buttons/ButtonFilled/ButtonFilled.styled';
import { StyledCircleContainer } from 'Shared/UserCircle/UserCircle.styled';

export const StyledAvatarSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 39%;
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};

  & > h6 {
    margin-bottom: 1.5rem;
  }

  & ${StyledButtonFilled}, & ${StyledCircleContainer} {
    margin-right: 3rem;
  }
`;

export const StyledHorizontalContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledUserInfoSettingsContainer = styled.div`
  display: flex;
  width: 59%;
  padding: 1rem;
  background-color: ${(props) => props.theme.surface};
`;
