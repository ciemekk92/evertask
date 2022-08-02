import styled from 'styled-components';
import React from 'react';
import { ISSUE_PRIORITY } from '../constants';
import { StyledBadge, StyledFlexContainerAllCenter } from '../SharedStyles.styled';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly priority: ISSUE_PRIORITY;
}

const getBadgeColor = (priority: ISSUE_PRIORITY): string => {
  return {
    [ISSUE_PRIORITY.ASAP]: '#850A0A',
    [ISSUE_PRIORITY.VERY_HIGH]: '#D33636',
    [ISSUE_PRIORITY.HIGH]: '#E36E2D',
    [ISSUE_PRIORITY.MEDIUM]: '#EAC344',
    [ISSUE_PRIORITY.LOW]: '#67C243'
  }[priority];
};

export const StyledPriorityBadge = styled(StyledFlexContainerAllCenter)<BadgeProps>`
  ${StyledBadge};
  background-color: ${(props) => getBadgeColor(props.priority)};
  color: ${(props) =>
    [ISSUE_PRIORITY.LOW, ISSUE_PRIORITY.MEDIUM].includes(props.priority)
      ? props.theme.textOnLight
      : props.theme.textOnPrimary};
`;
