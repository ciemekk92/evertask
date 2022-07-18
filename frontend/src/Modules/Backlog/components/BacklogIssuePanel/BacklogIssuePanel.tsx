import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Issue } from 'Types/Issue';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { PriorityBadge } from 'Shared/PriorityBadge';
import { StoryPointBadge } from 'Shared/StoryPointBadge';
import { IssueTypeIcon } from 'Shared/IssueTypeIcon';
import { StatusBadge } from 'Shared/StatusBadge';
import {
  StyledDraggablePanel,
  StyledIconsContainer,
  StyledIssueTitle
} from './BacklogIssuePanel.styled';
import { DROPDOWN_MENU_POSITION, DropdownMenu } from 'Shared/Elements/DropdownMenu';

interface Props {
  issue: Issue.IssueEntity;
  index: number;
  handleOpeningEditIssue: (issueId: Id) => VoidFunctionNoArgs;
  handleViewingIssue: (issueId: Id) => VoidFunctionNoArgs;
}

export const BacklogIssuePanel = ({
  issue,
  index,
  handleOpeningEditIssue,
  handleViewingIssue
}: Props): JSX.Element => {
  const currentProject = CurrentProjectModel.currentProjectValue;
  const { t } = useTranslation();

  const dropdownOptions = [
    {
      label: t('general.edit'),
      onClick: handleOpeningEditIssue(issue.id),
      iconName: 'edit'
    }
  ];

  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <StyledDraggablePanel
          ref={provided.innerRef}
          snapshot={snapshot}
          onClick={handleViewingIssue(issue.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <IssueTypeIcon type={issue.type} />
          <PriorityBadge priority={issue.priority} />
          <StyledIssueTitle>
            <strong>{`${currentProject.code}-${issue.key}`}</strong>
            {issue.title}
          </StyledIssueTitle>
          <StyledIconsContainer>
            <StoryPointBadge value={issue.estimateStoryPoints} />
            <StatusBadge status={issue.status} />
            <DropdownMenu options={dropdownOptions} position={DROPDOWN_MENU_POSITION.BOTTOM_LEFT} />
          </StyledIconsContainer>
        </StyledDraggablePanel>
      )}
    </Draggable>
  );
};
