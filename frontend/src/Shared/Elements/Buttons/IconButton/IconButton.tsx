import React from 'react';
import { StyledButton } from './IconButton.styled';
import { IconOutline } from '../../Icons';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  iconName: string;
}

export const IconButton = ({ children, iconName, ...props }: Props): JSX.Element => {
  return (
    <StyledButton data-testid="button_wrapper" {...props}>
      <IconOutline data-testid="button_icon" iconName={iconName} />
      {children}
    </StyledButton>
  );
};
