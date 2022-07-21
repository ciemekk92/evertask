import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Issue } from 'Types/Issue';
import { BoardIssueTile } from '..';
import {
  StyledColumnContainer,
  StyledColumnHeader,
  StyledDroppableWrapper
} from './BoardColumn.styled';
import { useTranslation } from 'react-i18next';

interface Props {
  label: string;
  elements?: Issue.IssueEntity[];
  handleViewingIssue: (id: Id) => VoidFunctionNoArgs;
}

export const BoardColumn = ({ label, elements, handleViewingIssue }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledColumnContainer>
      <StyledColumnHeader>{t(`general.issueStatus.${label}`).toUpperCase()}</StyledColumnHeader>
      <Droppable droppableId={label}>
        {(provided) => (
          <StyledDroppableWrapper {...provided.droppableProps} ref={provided.innerRef}>
            {elements &&
              elements.map((element: Issue.IssueEntity, index: number) => (
                <BoardIssueTile
                  handleViewingIssue={handleViewingIssue}
                  key={element.id}
                  issue={element}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </StyledDroppableWrapper>
        )}
      </Droppable>
    </StyledColumnContainer>
  );
};
