import React from 'react';
import styled from 'styled-components';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { StyledBadge } from 'Shared/StoryPointBadge/StoryPointBadge.styled';
import { StyledIcon } from 'Shared/Elements/Icons/Shared.styled';
import {
  StyledFlexColumnContainer,
  StyledFlexContainerAlignCenter,
  StyledTextEllipsis
} from 'Shared/SharedStyles.styled';

interface DraggableTileProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly snapshot: DraggableStateSnapshot;
  readonly isSubtask: boolean;
  readonly isParentInSameColumn: boolean;
}

const getTileWidth = (isSubtask: boolean, isParentInSameColumn: boolean): string => {
  return isSubtask ? (isParentInSameColumn ? '95%' : '100%') : '100%';
};

export const StyledTile = styled(StyledFlexColumnContainer)<DraggableTileProps>`
  width: ${({ isSubtask, isParentInSameColumn }) => getTileWidth(isSubtask, isParentInSameColumn)};
  margin-left: ${(props) => (props.isSubtask ? 'auto' : 0)};
  padding: 1.4rem 1rem;
  border-radius: 0.3rem;
  position: relative;
  background-color: ${({ isSubtask, theme }) =>
    isSubtask ? theme.subtaskBackground : theme.surfaceSecondary};

  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }
`;

export const StyledParentIssueRow = styled.div`
  background-color: ${(props) => props.theme.primaryDark};
  width: 100%;
  position: absolute;
  border-radius: 0.3rem;
  padding: 0.1rem 0.5rem;
  top: 0;
  left: 0;
  ${StyledTextEllipsis}
`;

export const StyledIssueTitleContainer = styled(StyledFlexColumnContainer)`
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;

export const StyledIssueCode = styled.strong`
  margin-right: 0.6rem;
`;

export const StyledIssueTitle = styled.p`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`;

export const StyledInformationContainer = styled(StyledFlexContainerAlignCenter)`
  & ${StyledIcon} {
    margin-right: 0.6rem;
  }

  & ${StyledBadge} {
    margin-left: auto;
  }
`;
