import React from 'react';
import { noop } from 'lodash';
import { StyledCheck, StyledContainer, StyledLabel, StyledRadio } from './RadioField.styled';

interface Props {
  id: string;
  label: string;
  checked: boolean;
  onClick: (e: React.MouseEvent) => void;
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
