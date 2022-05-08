import styled from 'styled-components';
import React from 'react';

interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  readonly iconColor?: string;
}

export const StyledIcon = styled.span<IconProps>`
  cursor: default;
  color: ${(props) => (props.iconColor ? props.iconColor : 'inherit')};
`;
