import React from 'react';
import { StyledButton } from './IconButton.styled';
import { IconOutline } from '../../Icons';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  iconName: string;
}

export const IconButton = ({ children, iconName, ...props }: Props): JSX.Element => {
  return (
    <StyledButton role="button" {...props}>
      <IconOutline role="presentation" iconName={iconName} />
      {children && <p>{children}</p>}
    </StyledButton>
  );
};
