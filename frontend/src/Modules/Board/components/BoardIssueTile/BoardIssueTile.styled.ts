import React from 'react';
import styled from 'styled-components';
import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { StyledBadge } from 'Shared/StoryPointBadge/StoryPointBadge.styled';
import { StyledIcon } from 'Shared/Elements/Icons/Shared.styled';
import {
  StyledFlexColumnContainer,
  StyledFlexContainerAlignCenter
} from 'Shared/SharedStyles.styled';

interface DraggableTileProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly snapshot: DraggableStateSnapshot;
}

export const StyledTile = styled(StyledFlexColumnContainer)<DraggableTileProps>`
  width: 100%;
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surfaceSecondary};

  &:not(:last-child) {
    margin-bottom: 0.8rem;
  }
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
