import React from 'react';
import { Droppable, DroppableProvided } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { Issue } from 'Types/Issue';
import { BacklogIssuePanel, EmptySection } from '..';
import { StyledDroppableWrapper } from '../Shared.styled';

interface Props {
  issues: Issue.IssueEntity[];
}

export const UnassignedIssues = ({ issues }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderIssues = (): JSX.Element | JSX.Element[] => {
    if (!issues.length) {
      return <EmptySection />;
    }

    return issues.map((issue: Issue.IssueEntity, index: number) => (
      <BacklogIssuePanel issue={issue} index={index} key={issue.id} />
    ));
  };

  return (
    <StyledDroppableWrapper>
      <Heading6>{t('backlog.unassigned.title')}</Heading6>
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
