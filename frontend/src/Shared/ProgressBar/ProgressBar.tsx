import React from 'react';
import { StyledBar, StyledBarContainer } from './ProgressBar.styled';

interface Props {
  barColor: string;
  percentage?: number;
  isInverted?: boolean;
}

export const ProgressBar = ({ barColor, percentage = 100, isInverted }: Props): JSX.Element => {
  return (
    <StyledBarContainer>
      <StyledBar percentage={percentage} barColor={barColor} isInverted={isInverted} />
    </StyledBarContainer>
  );
};
