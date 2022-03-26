import React from 'react';
import { StyledLinkButton } from './ButtonLikeLink.styled';

export const ButtonLikeLink = ({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return <StyledLinkButton {...props}>{children}</StyledLinkButton>;
};
