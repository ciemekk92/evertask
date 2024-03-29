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
  border-radius: 0.3rem;
  font-size: 1.6rem;
  font-family: Lato, sans-serif;
  outline: none;
  resize: none;
  white-space: pre-wrap;

  &::placeholder {
    color: ${(props) => props.theme.secondaryText};
  }

  ${({ error }) => error && errorBorderCss}
`;

export const StyledReadonlyField = styled.div`
  font-size: 1.6rem;
  padding: calc(0.5rem + 1px) calc(1rem + 1px);
  white-space: pre-line;
`;

export const StyledNoValueMessage = styled.p`
  font-size: 1.6rem;
  color: ${(props) => props.theme.disabled};
`;
