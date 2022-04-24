import React from 'react';
import { StyledInput, StyledInputContainer } from './SearchInput.styled';
import { IconOutline } from '../Icons';
import { ICON_SIZE } from '../../constants';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: VoidFunctionNoArgs;
}

export const SearchInput = ({ onChange, onIconClick, ...restProps }: Props) => {
  return (
    <StyledInputContainer>
      <IconOutline onClick={onIconClick} iconName="search" iconSize={ICON_SIZE.LARGE} />
      <StyledInput type="text" onChange={onChange} {...restProps} />
    </StyledInputContainer>
  );
};
