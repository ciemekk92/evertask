import styled from 'styled-components';
import { StyledButton } from 'Shared/Elements/Buttons/IconButton/IconButton.styled';
import { StyledLinkButton } from 'Shared/Elements/Buttons/ButtonLikeLink/ButtonLikeLink.styled';
import {
  StyledFlexColumnContainerAllCenter,
  StyledFlexContainerAllCenter
} from 'Shared/SharedStyles.styled';

export const LoginWrapper = styled(StyledFlexColumnContainerAllCenter)`
  text-align: center;
  width: 60rem;
  margin: 10rem auto 0;
  padding: 2rem 0 5rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};
  box-shadow: 0 0.4rem 0.5rem ${(props) => props.theme.boxShadow};
  transition: all 0.4s ease;

  & h3,
  h6 {
    margin: 2rem 0;
  }

  & h6 {
    padding: 0 2rem;
  }

  & form {
    width: 80%;

    & input {
      width: 100%;
      margin-bottom: 0.5rem;
    }
  }

  & ${StyledLinkButton} {
    align-self: flex-end;
  }

  & ${StyledButton} {
    align-self: flex-start;
    margin-left: 1rem;

    & span {
      margin: 0;
    }
  }
`;

export const ButtonsContainer = styled(StyledFlexContainerAllCenter)`
  width: 100%;
  margin-top: 3rem;

  & button {
    width: 30%;
    margin-bottom: 2rem;

    &:not(:last-child) {
      margin-right: 1.5rem;
    }
  }
`;
