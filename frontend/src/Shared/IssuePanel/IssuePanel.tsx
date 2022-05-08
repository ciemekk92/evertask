import React from 'react';
import { Issue } from 'Types/Issue';
import { IssueTypeIcon } from '../IssueTypeIcon';
import { PriorityBadge } from '../PriorityBadge';
import { StyledIssueName, StyledIssuePanel } from './IssuePanel.styled';

interface Props {
  issue: Issue.IssueEntity;
}

export const IssuePanel = ({ issue }: Props): JSX.Element => {
  return (
    <StyledIssuePanel>
      <IssueTypeIcon type={issue.type} />
      <PriorityBadge priority={issue.priority} />
      <StyledIssueName>{issue.title}</StyledIssueName>
    </StyledIssuePanel>
  );
};
