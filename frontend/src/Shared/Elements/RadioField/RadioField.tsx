import React from 'react';
import { noop } from 'lodash';
import {
  StyledCheck,
  StyledContainer,
  StyledFormikRadio,
  StyledLabel,
  StyledRadio
} from './RadioField.styled';

interface Props {
  id: string;
  label: string;
  checked: boolean;
  onClick: (e: React.MouseEvent) => void;
}

interface FormikProps {
  label: string;
  name: string;
  value: string | number | boolean;
  disabled?: boolean;
  handleClick: (field: string, value: Unrestricted) => void;
}

export const RadioField = ({ id, label, checked, onClick }: Props): JSX.Element => {
  return (
    <StyledContainer onClick={onClick}>
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
      <StyledRadio type="radio" id={id} checked={checked} onChange={noop} />
      <StyledCheck />
    </StyledContainer>
  );
};

export const FormikRadio = ({
  label,
  name,
  value,
  handleClick,
  disabled
}: FormikProps): JSX.Element => {
  const handleSelecting = () => {
    if (!disabled) {
      handleClick(name, value);
    }
  };

  return (
    <StyledContainer onClick={handleSelecting}>
      <StyledLabel>{label}</StyledLabel>
      <StyledFormikRadio disabled={disabled} name={name} value={value} />
      <StyledCheck disabled={disabled} />
    </StyledContainer>
  );
};
