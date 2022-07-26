import styled from 'styled-components';
import { TextInputErrorMessage } from 'Shared/Elements/TextInput';

export const StyledDialogContent = styled.div`
  width: 95rem;
  max-height: 80vh;
  padding: 0 2rem;

  & ${TextInputErrorMessage} {
    margin-bottom: 0;
  }
`;
