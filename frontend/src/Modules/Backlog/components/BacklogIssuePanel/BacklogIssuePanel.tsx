import React from 'react';
import { Issue } from 'Types/Issue';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { PriorityBadge } from 'Shared/PriorityBadge';
import { StoryPointBadge } from 'Shared/StoryPointBadge';
import { IssueTypeIcon } from 'Shared/IssueTypeIcon';
import { StyledDraggablePanel, StyledIssueTitle } from './BacklogIssuePanel.styled';

interface Props {
  issue: Issue.IssueEntity;
  index: number;
}

export const BacklogIssuePanel = ({ issue, index }: Props): JSX.Element => {
  const currentProject = CurrentProjectModel.currentProjectValue;

  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <StyledDraggablePanel
          ref={provided.innerRef}
          snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IssueTypeIcon type={issue.type} />
          <PriorityBadge priority={issue.priority} />
          <StyledIssueTitle>
            <strong>{`${currentProject.code}-${issue.key}`}</strong>
            {issue.title}
          </StyledIssueTitle>
          <StoryPointBadge value={issue.estimateStoryPoints} />
        </StyledDraggablePanel>
      )}
    </Draggable>
  );
};
