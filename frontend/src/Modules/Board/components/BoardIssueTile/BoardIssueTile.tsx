import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { StyledTile } from './BoardIssueTile.styled';

interface Props {
  issue: any;
  index: number;
}

export const BoardIssueTile = ({ issue, index }: Props): JSX.Element => {
  return (
    <Draggable draggableId={issue.id} index={index}>
      {(provided, snapshot) => (
        <StyledTile
          ref={provided.innerRef}
          snapshot={snapshot}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        ></StyledTile>
      )}
    </Draggable>
  );
};
