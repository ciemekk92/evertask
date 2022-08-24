import styled from 'styled-components';
import { TextInput, TextInputErrorMessage } from 'Shared/Elements/TextInput';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';
import {
  StyledFieldContainer,
  StyledFormLabel
} from 'Shared/Elements/Form/FormField/FormField.styled';

export const StyledDialogContent = styled.div`
  width: 60rem;
  max-height: 20vh;
  padding: 0 2rem;

  & > p {
    margin-bottom: 2rem;
    font-size: 1.8rem;
    color: ${(props) => props.theme.primaryDark};
    text-align: center;
  }

  & ${TextInputErrorMessage} {
    margin-bottom: 0;
  }
`;

export const StyledInputsContainer = styled(StyledFlexContainer)`
  & ${StyledFieldContainer}:not(:last-child) {
    margin-right: 4rem;
  }
  & ${StyledFormLabel} {
    min-width: 8rem;
  }

  & ${TextInput} {
    min-width: 4rem;
  }
`;
