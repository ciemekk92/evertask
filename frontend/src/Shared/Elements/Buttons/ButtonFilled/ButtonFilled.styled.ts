import styled from 'styled-components';
import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly backgroundColor?: string;
}

export const StyledButtonFilled = styled.button<Props>`
  background-color: ${(props) =>
    props.disabled
      ? props.theme.disabled
      : props.backgroundColor
      ? props.backgroundColor
      : props.theme.primaryDark};
  border: none;
  font-size: 1.6rem;
  height: 3.2rem;
  min-width: 12rem;
  padding: 0 0.5rem;
  border-radius: 0.5rem;
  color: ${(props) => (props.disabled ? props.theme.disabledText : props.theme.textOnPrimary)};
  box-shadow: 0 0.3rem 0.4rem rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
  cursor: pointer;
  backface-visibility: visible;

  &:hover {
    background-color: ${(props) => (!props.disabled ? props.theme.primary : null)};
    color: ${(props) => props.theme.textOnPrimary};
  }
`;
