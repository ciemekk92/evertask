import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { Sprint } from 'Types/Sprint';
import { Issue } from 'Types/Issue';
import { BacklogIssuePanel, EmptySection } from '..';
import { StyledDroppableWrapper } from '../Shared.styled';

interface Props {
  sprint: Sprint.SprintIssuesEntity;
}

export const SprintSection = ({ sprint }: Props): JSX.Element => {
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
      <BacklogIssuePanel issue={issue} index={index} key={issue.id} />
    ));
  };

  return (
    <StyledDroppableWrapper>
      <Heading6>{headingTitle}</Heading6>
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
