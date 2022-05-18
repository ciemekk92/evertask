import React from 'react';
import styled from 'styled-components';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';

interface DraggableTileProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly snapshot: DraggableStateSnapshot;
}

export const StyledTile = styled.div<DraggableTileProps>`
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: white;
  margin-bottom: 0.8rem;
`;
