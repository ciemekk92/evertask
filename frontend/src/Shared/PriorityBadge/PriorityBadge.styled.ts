import styled from 'styled-components';
import React from 'react';
import { ISSUE_PRIORITY } from '../constants';

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

export const StyledPriorityBadge = styled.div<BadgeProps>`
  display: flex;
  width: 5.4rem;
  height: 2rem;
  padding: 0.3rem 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
  cursor: default;
  border-radius: 0.3rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  background-color: ${(props) => getBadgeColor(props.priority)};
  color: ${(props) =>
    [ISSUE_PRIORITY.LOW, ISSUE_PRIORITY.MEDIUM].includes(props.priority)
      ? props.theme.textOnLight
      : props.theme.textOnPrimary};
`;
