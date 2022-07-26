import styled from 'styled-components';
import React from 'react';

interface ColorFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly color: string;
  readonly isActive?: boolean;
}

export const StyledColorField = styled.div<ColorFieldProps>`
  width: 5rem;
  height: 3rem;
  background-color: ${(props) => props.color};
  border: ${(props) => (props.isActive ? '2px solid ' + props.theme.primaryText : 'none')};
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    transform: translateY(-0.3rem);
    box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.4);
  }

  &:not(:last-child) {
    margin-right: 1.6rem;
  }
`;
