import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Issue } from 'Types/Issue';
import { renderUserCircle } from 'Utils/renderUserCircle';
import { IssueTypeIcon } from '../IssueTypeIcon';
import { PriorityBadge } from '../PriorityBadge';
import { StoryPointBadge } from '../StoryPointBadge';
import {
  StyledIssuePanel,
  StyledRightContainer,
  StyledSubtasksContainer
} from './IssuePanel.styled';
import { StyledFlexColumnContainer } from '../SharedStyles.styled';

interface Props {
  issue: Issue.IssueFullEntity | Issue.IssueLastEntity;
}

export const IssuePanel = ({ issue }: Props): JSX.Element => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();

    navigate(`/issue/${issue.id}`);
  };

  const renderSubtasks = (): Nullable<JSX.Element> => {
    if (!('subtasks' in issue) || !issue.subtasks.length) {
      return null;
    }

    return (
      <StyledSubtasksContainer>
        {issue.subtasks.map((subtask) => (
          <IssuePanel issue={subtask} key={subtask.id} />
        ))}
      </StyledSubtasksContainer>
    );
  };

  return (
    <StyledFlexColumnContainer>
      <StyledIssuePanel onClick={handleClick}>
        <IssueTypeIcon type={issue.type} />
        <PriorityBadge priority={issue.priority} />
        <strong>{`${issue.project.code}-${issue.key}`}</strong>
        <p>{issue.title}</p>
        <StyledRightContainer>
          <StoryPointBadge value={issue.estimateStoryPoints} />
          {renderUserCircle(issue.assignee)}
        </StyledRightContainer>
      </StyledIssuePanel>
      {renderSubtasks()}
    </StyledFlexColumnContainer>
  );
};
