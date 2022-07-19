import React from 'react';
import { StyledInput, StyledInputContainer } from './SearchInput.styled';
import { IconOutline } from '../Icons';
import { ICON_SIZE } from '../../constants';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: (event: React.MouseEvent) => void;
}

export const SearchInput = ({ onChange, onIconClick, ...restProps }: Props): JSX.Element => {
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onIconClick) {
      onIconClick(e);
    }
  };

  return (
    <StyledInputContainer>
      <IconOutline onClick={onClick} iconName="search" iconSize={ICON_SIZE.LARGE} />
      <StyledInput type="text" onChange={onChange} {...restProps} />
    </StyledInputContainer>
  );
};
