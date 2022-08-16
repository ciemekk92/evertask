import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { IssueTypeIcon } from 'Shared/IssueTypeIcon';
import { PriorityBadge } from 'Shared/PriorityBadge';
import { StoryPointBadge } from 'Shared/StoryPointBadge';
import { Issue } from 'Types/Issue';
import { StyledIssueTitle, StyledPanelContainer } from './SubtaskPanel.styled';

interface Props {
  subtask: Issue.IssueEntity;
}

export const SubtaskPanel = ({ subtask }: Props): JSX.Element => {
  const navigate = useNavigate();
  const currentProject = CurrentProjectModel.currentProjectValue;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    navigate(`/issue/${subtask.id}`);
  };

  return (
    <StyledPanelContainer onClick={handleClick}>
      <IssueTypeIcon type={subtask.type} />
      <PriorityBadge priority={subtask.priority} />
      <StyledIssueTitle>
        <strong>{`${currentProject.code}-${subtask.key}`}</strong>
        {subtask.title}
      </StyledIssueTitle>
      <StoryPointBadge value={subtask.estimateStoryPoints} />
    </StyledPanelContainer>
  );
};
