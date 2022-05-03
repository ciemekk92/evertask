import React from 'react';
import { StyledInfoContent, StyledInfoField, StyledInfoLabel } from './InfoField.styled';

interface Props {
  label: string;
  value: string | JSX.Element;
}

export const InfoField = ({ label, value }: Props): JSX.Element => {
  return (
    <StyledInfoField>
      <StyledInfoLabel>{label}</StyledInfoLabel>
      <StyledInfoContent>{value}</StyledInfoContent>
    </StyledInfoField>
  );
};
