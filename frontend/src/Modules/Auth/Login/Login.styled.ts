import styled from 'styled-components';
import { StyledButton } from 'Shared/Elements/Buttons/IconButton/IconButton.styled';
import { StyledLinkButton } from '../../../Shared/Elements/Buttons/ButtonLikeLink/ButtonLikeLink.styled';

export const LoginWrapper = styled.div`
  text-align: center;
  width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

  & input {
    width: 100%;
    margin-bottom: 2rem;
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

export const InputsContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5rem;
  align-items: center;
  justify-content: center;

  & button {
    width: 30%;
    margin-bottom: 2rem;

    &:not(:last-child) {
      margin-right: 1.5rem;
    }
  }
`;
