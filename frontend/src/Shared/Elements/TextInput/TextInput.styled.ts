import styled from 'styled-components';
import { errorBorderCss } from 'Themes';
import { InputField } from './InputField';

export const TextInput = styled(InputField)`
  height: 4.8rem;
  min-width: 24rem;
  border: 1px solid ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.primaryText};
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.secondaryText};
  }

  ${({ error }) => error && errorBorderCss}
`;

export const TextInputErrorMessage = styled.div`
  color: ${(props) => props.theme.error};
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding: 0.5rem 0.75rem;
  white-space: pre-line;
`;
