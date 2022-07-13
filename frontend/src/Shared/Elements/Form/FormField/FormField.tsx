import React from 'react';
import { ErrorMessage } from 'formik';
import { TextInputErrorMessage } from 'Shared/Elements/TextInput';

import {
  StyledChildrenContainer,
  StyledFieldContainer,
  StyledFormLabel,
  StyledLabelAndInputContainer,
  StyledLabelContainer,
  StyledRequiredMark
} from './FormField.styled';

interface Props {
  label: string;
  name: string;
  alignItems?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField = ({ label, name, required, children, alignItems }: Props): JSX.Element => {
  return (
    <StyledFieldContainer>
      <StyledLabelAndInputContainer alignItems={alignItems}>
        <StyledLabelContainer>
          <StyledFormLabel>
            {label} {required && <StyledRequiredMark>*</StyledRequiredMark>}
          </StyledFormLabel>
        </StyledLabelContainer>
        <StyledChildrenContainer>{children}</StyledChildrenContainer>
      </StyledLabelAndInputContainer>
      <ErrorMessage name={name}>
        {(msg: string) => <TextInputErrorMessage>{msg}</TextInputErrorMessage>}
      </ErrorMessage>
    </StyledFieldContainer>
  );
};
