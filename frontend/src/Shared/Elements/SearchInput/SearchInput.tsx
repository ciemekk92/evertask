import React from 'react';
import { StyledInput, StyledInputContainer } from './SearchInput.styled';
import { IconOutline } from '../Icons';
import { ICON_SIZE } from '../../constants';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onIconClick?: (event: React.MouseEvent) => void;
}

export const SearchInput = ({
  onChange,
  onIconClick,
  onKeyDown,
  ...restProps
}: Props): JSX.Element => {
  const onClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (onIconClick) {
      onIconClick(e);
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (onKeyDown && e.key === 'Enter') {
      onKeyDown(e);
    }
  };

  return (
    <StyledInputContainer>
      <IconOutline onClick={onClick} iconName="search" iconSize={ICON_SIZE.LARGE} />
      <StyledInput type="text" onKeyDown={handleEnter} onChange={onChange} {...restProps} />
    </StyledInputContainer>
  );
};
