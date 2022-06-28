import styled from 'styled-components';
import React from 'react';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { StyledPriorityBadge } from 'Shared/PriorityBadge/PriorityBadge.styled';
import { StyledBadge } from 'Shared/StoryPointBadge/StoryPointBadge.styled';

interface DraggableProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly snapshot: DraggableStateSnapshot;
}

export const StyledDraggablePanel = styled.div<DraggableProps>`
  background-color: ${(props) => props.theme.surfaceSecondary};
  padding: 0.8rem 1.2rem;
  border-radius: 0.3rem;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  transition: all 0.4s ease;

  & span,
  & ${StyledPriorityBadge}, & ${StyledBadge} {
    margin-right: 1rem;
  }

  & ${StyledBadge} {
    margin-left: auto;
  }

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    color: ${(props) => props.theme.textOnPrimary};
    transform: translateY(-0.2rem);
  }
`;

export const StyledIssueTitle = styled.p`
  font-size: 1.8rem;

  & strong {
    margin-right: 0.8rem;
  }
`;
