import styled from 'styled-components';
import { TextInputErrorMessage } from 'Shared/Elements/TextInput';

export const StyledDialogContent = styled.div`
  width: 70rem;

  & ${TextInputErrorMessage} {
    margin-bottom: 0;
  }
`;
