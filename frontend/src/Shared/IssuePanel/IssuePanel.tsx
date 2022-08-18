import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Issue } from 'Types/Issue';
import { IssueTypeIcon } from '../IssueTypeIcon';
import { PriorityBadge } from '../PriorityBadge';
import { StyledIssueName, StyledIssuePanel } from './IssuePanel.styled';

interface Props {
  issue: Issue.IssueEntity;
}

export const IssuePanel = ({ issue }: Props): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();

    navigate(`/issue/${issue.id}`);
  };

  return (
    <StyledIssuePanel onClick={handleClick}>
      <IssueTypeIcon type={issue.type} />
      <PriorityBadge priority={issue.priority} />
      <StyledIssueName>{issue.title}</StyledIssueName>
    </StyledIssuePanel>
  );
};
