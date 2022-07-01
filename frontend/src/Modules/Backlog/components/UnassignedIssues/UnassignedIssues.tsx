import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { IconButton } from 'Shared/Elements/Buttons';
import { Heading6 } from 'Shared/Typography';
import { PROJECT_METHODOLOGIES } from 'Shared/constants';
import { Issue } from 'Types/Issue';
import { BacklogIssuePanel, EmptySection } from '..';
import { StyledDroppableWrapper, StyledHeaderWrapper } from '../Shared.styled';

interface Props {
  issues: Issue.IssueEntity[];
  handleOpeningAddIssue: (sprintId: Nullable<Id>) => void;
  handleOpeningEditIssue: (issueId: Id) => VoidFunctionNoArgs;
}

export const UnassignedIssues = ({
  issues,
  handleOpeningAddIssue,
  handleOpeningEditIssue
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const handleAddingNewIssue = (): void => {
    handleOpeningAddIssue(null);
  };

  const renderHeading = (): Nullable<JSX.Element> => {
    if (CurrentProjectModel.currentProjectValue.methodology === PROJECT_METHODOLOGIES.AGILE) {
      return (
        <StyledHeaderWrapper>
          <Heading6>{t('backlog.unassigned.title')}</Heading6>
          <IconButton iconName="add" onClick={handleAddingNewIssue}>
            {t('backlog.addIssue')}
          </IconButton>
        </StyledHeaderWrapper>
      );
    }

    return null;
  };

  const renderIssues = (): JSX.Element | JSX.Element[] => {
    if (!issues.length) {
      return <EmptySection />;
    }

    return issues.map((issue: Issue.IssueEntity, index: number) => (
      <BacklogIssuePanel
        issue={issue}
        index={index}
        key={issue.id}
        handleOpeningEditIssue={handleOpeningEditIssue}
      />
    ));
  };

  return (
    <StyledDroppableWrapper>
      {renderHeading()}
      <Droppable droppableId="unassigned">
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {renderIssues()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </StyledDroppableWrapper>
  );
};
