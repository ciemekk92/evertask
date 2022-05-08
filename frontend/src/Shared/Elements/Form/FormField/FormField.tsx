import React from 'react';
import { ErrorMessage } from 'formik';
import { TextInputErrorMessage } from 'Shared/Elements/TextInput';

import {
  StyledChildrenContainer,
  StyledFieldContainer,
  StyledFormLabel,
  StyledLabelAndInputContainer
} from './FormField.styled';

interface Props {
  label: string;
  name: string;
  children: React.ReactNode;
}

export const FormField = ({ label, name, children }: Props): JSX.Element => {
  return (
    <StyledFieldContainer>
      <StyledLabelAndInputContainer>
        <StyledFormLabel>{label}</StyledFormLabel>
        <StyledChildrenContainer>{children}</StyledChildrenContainer>
      </StyledLabelAndInputContainer>
      <ErrorMessage name={name}>
        {(msg: string) => <TextInputErrorMessage>{msg}</TextInputErrorMessage>}
      </ErrorMessage>
    </StyledFieldContainer>
  );
};
