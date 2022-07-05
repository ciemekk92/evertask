import styled from 'styled-components';
import React from 'react';
import { ISSUE_STATUS } from '../constants';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly status: ISSUE_STATUS;
}

const getBadgeColor = (status: ISSUE_STATUS): string => {
  return {
    [ISSUE_STATUS.TO_DO]: '#0d5db4',
    [ISSUE_STATUS.ON_HOLD]: '#850A0A',
    [ISSUE_STATUS.IN_PROGRESS]: '#55b0f5',
    [ISSUE_STATUS.CODE_REVIEW]: '#5b1cde',
    [ISSUE_STATUS.TESTING]: '#E36E2D',
    [ISSUE_STATUS.COMPLETED]: '#408821',
    [ISSUE_STATUS.ACCEPTED]: '#408821'
  }[status];
};

export const StyledStatusBadge = styled.div<BadgeProps>`
  display: flex;
  width: 8rem;
  height: 2rem;
  padding: 0.3rem 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
  cursor: default;
  border-radius: 0.3rem;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
  background-color: ${(props) => getBadgeColor(props.status)};
  color: ${(props) => props.theme.textOnPrimary};
`;
