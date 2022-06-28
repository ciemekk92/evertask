import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { BoardIssueTile } from '..';
import { StyledColumnContainer, StyledColumnHeader } from './BoardColumn.styled';

interface Props {
  label: string;
  elements: any[];
}

export const BoardColumn = ({ label, elements }: Props): JSX.Element => {
  return (
    <StyledColumnContainer>
      <StyledColumnHeader>{label}</StyledColumnHeader>
      <Droppable droppableId={label}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((element: any, index: number) => (
              <BoardIssueTile key={element.id} issue={element} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </StyledColumnContainer>
  );
};
