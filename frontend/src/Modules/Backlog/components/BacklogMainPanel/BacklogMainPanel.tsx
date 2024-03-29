import React from 'react';
import { useTranslation } from 'react-i18next';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Issue } from 'Types/Issue';
import { BacklogPanel } from '..';
import { StyledDraggablePanel, StyledSubtasksContainer } from './BacklogMainPanel.styled';

interface Props {
  issue: Issue.IssueFullEntity;
  index: number;
  handleOpeningEditIssue: (issueId: Id) => VoidFunctionNoArgs;
  handleViewingIssue: (issueId: Id) => VoidFunctionNoArgs;
}

export const BacklogMainPanel = ({
  issue,
  index,
  handleViewingIssue,
  handleOpeningEditIssue
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const mapDropdownOptions = (issueId: Id): Util.MenuOptionWithOnClick[] => [
    {
      label: t('general.view'),
      onClick: handleViewingIssue(issueId),
      iconName: 'view'
    },
    {
      label: t('general.edit'),
      onClick: handleOpeningEditIssue(issueId),
      iconName: 'edit'
    }
  ];

  const renderSubtasks = (): Nullable<JSX.Element> => {
    if (issue.subtasks && issue.subtasks.length) {
      return (
        <StyledSubtasksContainer>
          {issue.subtasks.map((subtask: Issue.IssueFullEntity) => (
            <BacklogPanel
              key={subtask.id}
              issue={subtask}
              dropdownOptions={mapDropdownOptions(subtask.id)}
            />
          ))}
        </StyledSubtasksContainer>
      );
    }

    return null;
  };

  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <StyledDraggablePanel
          ref={provided.innerRef}
          snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <BacklogPanel issue={issue} dropdownOptions={mapDropdownOptions(issue.id)} />
          {renderSubtasks()}
        </StyledDraggablePanel>
      )}
    </Draggable>
  );
};
