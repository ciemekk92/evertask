import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { IconButton } from 'Shared/Elements/Buttons';
import { Sprint } from 'Types/Sprint';
import { Issue } from 'Types/Issue';
import { EmptySection, BacklogMainPanel } from '..';
import { StyledDroppableWrapper, StyledHeaderWrapper } from '../Shared.styled';

interface Props {
  sprint: Sprint.SprintIssuesEntity;
  handleOpeningAddIssue: (sprintId: Nullable<Id>) => void;
  handleOpeningEditIssue: (issueId: Id) => VoidFunctionNoArgs;
  handleViewingIssue: (issueId: Id) => VoidFunctionNoArgs;
}

export const SprintSection = ({
  sprint,
  handleOpeningAddIssue,
  handleOpeningEditIssue,
  handleViewingIssue
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const headingTitle = React.useMemo(
    () => t('backlog.sprint.title', { ordinal: sprint.ordinal }),
    [t, sprint.ordinal]
  );

  const renderPanels = (): JSX.Element | JSX.Element[] => {
    if (!sprint.issues.length) {
      return <EmptySection />;
    }

    return sprint.issues.map((issue: Issue.IssueEntity, index: number) => (
      <BacklogMainPanel
        handleOpeningEditIssue={handleOpeningEditIssue}
        handleViewingIssue={handleViewingIssue}
        issue={issue}
        index={index}
        key={issue.id}
      />
    ));
  };

  const handleAddingNewIssue = (): void => {
    handleOpeningAddIssue(sprint.id);
  };

  return (
    <StyledDroppableWrapper>
      <StyledHeaderWrapper>
        <Heading6>{headingTitle}</Heading6>
        <IconButton iconName="add" onClick={handleAddingNewIssue}>
          {t('backlog.addIssue')}
        </IconButton>
      </StyledHeaderWrapper>
      <Droppable droppableId={sprint.id}>
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {renderPanels()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </StyledDroppableWrapper>
  );
};
