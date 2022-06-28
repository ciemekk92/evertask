import styled from 'styled-components';
import { DateField } from './DateField';

export const DateInput = styled(DateField)`
  height: 4.8rem;
  min-width: 24rem;
  border: 1px solid ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.primaryText};
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  outline: none;
  color-scheme: ${(props) => props.theme.colorScheme};

  &::-webkit-calendar-picker-indicator {
    color: #fff;
  }
`;
