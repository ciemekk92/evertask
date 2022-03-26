import React from 'react';
import { StyledFieldContainer, StyledValidationMessage } from './FormField.styled';

interface Props {
  isValid?: boolean;
  validationMessage?: string;
  children: React.ReactNode;
}

export const FormField = ({ isValid, validationMessage, children }: Props): JSX.Element => {
  return (
    <StyledFieldContainer>
      {children}
      {!isValid && <StyledValidationMessage>{validationMessage}</StyledValidationMessage>}
    </StyledFieldContainer>
  );
};
