import styled from 'styled-components';
import { TextInput } from 'Shared/Elements/TextInput';

export const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & ${TextInput} {
    width: 80%;
    margin-bottom: 1rem;

    &:first-child {
      margin-top: 1rem;
    }
  }
`;
