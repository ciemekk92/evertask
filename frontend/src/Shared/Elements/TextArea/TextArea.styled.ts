import styled from 'styled-components';
import { errorBorderCss } from 'Themes';
import { AreaField } from './AreaField';

export const TextArea = styled(AreaField)`
  min-width: 24rem;
  height: 15rem;
  border: 1px solid ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.primaryText};
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  font-family: Lato, sans-serif;
  outline: none;
  resize: none;

  &::placeholder {
    color: ${(props) => props.theme.secondaryText};
  }

  ${({ error }) => error && errorBorderCss}
`;
