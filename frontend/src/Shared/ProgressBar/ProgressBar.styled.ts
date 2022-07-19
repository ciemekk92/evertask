import React from 'react';
import styled from 'styled-components';

interface BarProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly percentage: number;
  readonly barColor: string;
  readonly isInverted?: boolean;
}

export const StyledBarContainer = styled.div`
  height: 1.6rem;
  background-color: ${(props) => props.theme.surfaceTertiary};

  &,
  & > div {
    border-radius: 0.3rem;
  }
`;

export const StyledBar = styled.div<BarProps>`
  width: ${(props) => props.percentage}%;
  height: 100%;
  background-color: ${(props) => props.barColor};
  margin-left: ${(props) => (props.isInverted ? 'auto' : 0)};
`;
