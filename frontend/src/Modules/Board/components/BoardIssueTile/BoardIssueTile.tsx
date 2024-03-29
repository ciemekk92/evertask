import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { Issue } from 'Types/Issue';
import { IssueTypeIcon } from 'Shared/IssueTypeIcon';
import { StoryPointBadge } from 'Shared/StoryPointBadge';
import { PriorityBadge } from 'Shared/PriorityBadge';
import { StyledFlexContainerSpaceBetween } from 'Shared/SharedStyles.styled';
import { isDefined } from 'Utils/isDefined';
import { renderUserCircle } from 'Utils/renderUserCircle';
import {
  StyledInformationContainer,
  StyledIssueCode,
  StyledIssueTitle,
  StyledIssueTitleContainer,
  StyledMainIssueContainer,
  StyledParentIssueRow,
  StyledTile
} from './BoardIssueTile.styled';

interface Props {
  issue: Issue.IssueFullEntity;
  parent?: Issue.IssueFullEntity;
  index: number;
  isSubtask: boolean;
  isDragDisabled: boolean;
  handleViewingIssue: (id: Id) => VoidFunctionNoArgs;
}

export const BoardIssueTile = ({
  issue,
  index,
  isSubtask,
  parent,
  isDragDisabled,
  handleViewingIssue
}: Props): JSX.Element => {
  const currentProject = CurrentProjectModel.currentProjectValue;

  return (
    <Draggable key={issue.id} draggableId={issue.id} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <StyledTile
          key={issue.id}
          ref={provided.innerRef}
          isSubtask={isSubtask}
          isParentInSameColumn={!isDefined(parent)}
          snapshot={snapshot}
          onClick={handleViewingIssue(issue.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {parent && (
            <StyledParentIssueRow>{`${currentProject.code}-${parent.key} ${parent.title}`}</StyledParentIssueRow>
          )}
          <StyledMainIssueContainer>
            <StyledIssueTitleContainer>
              <StyledIssueTitle>{issue.title}</StyledIssueTitle>
              <StyledFlexContainerSpaceBetween>
                <StyledIssueCode>{`${currentProject.code}-${issue.key}`}</StyledIssueCode>
                {renderUserCircle(issue.assignee)}
              </StyledFlexContainerSpaceBetween>
            </StyledIssueTitleContainer>
            <StyledInformationContainer>
              <IssueTypeIcon type={issue.type} />
              <PriorityBadge priority={issue.priority} />
              <StoryPointBadge value={issue.estimateStoryPoints} />
            </StyledInformationContainer>
          </StyledMainIssueContainer>
        </StyledTile>
      )}
    </Draggable>
  );
};
