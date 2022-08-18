import styled from 'styled-components';
import React from 'react';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { StyledPriorityBadge } from 'Shared/PriorityBadge/PriorityBadge.styled';
import { StyledBadge } from 'Shared/StoryPointBadge/StoryPointBadge.styled';
import { StyledDropdownOption } from 'Shared/Elements/SingleSelectDropdown/SingleSelectDropdown.styled';
import { StyledStatusBadge } from 'Shared/StatusBadge/StatusBadge.styled';
import {
  StyledFlexColumnContainer,
  StyledFlexContainerAlignCenter
} from 'Shared/SharedStyles.styled';

interface DraggableProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly snapshot: DraggableStateSnapshot;
}

export const StyledDraggablePanel = styled(StyledFlexColumnContainer)<DraggableProps>`
  margin-bottom: 0.8rem;
`;

export const StyledIssueContainer = styled(StyledFlexContainerAlignCenter)`
  padding: 0.6rem 1rem;
  border-radius: 0.3rem;
  transition: all 0.4s ease;
  background-color: ${(props) => props.theme.surfaceSecondary};

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.textOnPrimary};
    transform: translateY(-0.2rem);
  }

  & span,
  & ${StyledPriorityBadge}, & ${StyledBadge}, & ${StyledStatusBadge} {
    margin-right: 1rem;
  }

  & ${StyledDropdownOption} {
    background-color: ${(props) => props.theme.surfaceTertiary};

    &:hover {
      background-color: ${(props) => props.theme.primary};
    }
  }
`;

export const StyledSubtasksContainer = styled(StyledFlexColumnContainer)`
  margin: 1rem 0 0 auto;
  width: 98.5%;

  & ${StyledIssueContainer}:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export const StyledIconsContainer = styled(StyledFlexContainerAlignCenter)`
  margin-left: auto;
`;

export const StyledIssueTitle = styled.p`
  font-size: 1.8rem;

  & strong {
    margin-right: 0.8rem;
  }
`;
