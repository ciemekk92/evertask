import React from 'react';
import { ErrorMessage } from 'formik';
import { TextInputErrorMessage } from 'Shared/Elements/TextInput';

import {
  StyledFieldContainer,
  StyledFormLabel,
  StyledLabelAndInputContainer
} from './FormField.styled';

interface Props {
  label: string;
  name: string;
  children: React.ReactElement;
}

export const FormField = ({ label, name, children }: Props): JSX.Element => {
  return (
    <StyledFieldContainer>
      <StyledLabelAndInputContainer>
        <StyledFormLabel>{label}</StyledFormLabel>
        {children}
      </StyledLabelAndInputContainer>
      <ErrorMessage name={name}>
        {(msg: string) => <TextInputErrorMessage>{msg}</TextInputErrorMessage>}
      </ErrorMessage>
    </StyledFieldContainer>
  );
};
