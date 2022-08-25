import styled from 'styled-components';
import { StyledIcon } from 'Shared/Elements/Icons/Shared.styled';
import { StyledPriorityBadge } from '../PriorityBadge/PriorityBadge.styled';
import { StyledFlexColumnContainer, StyledFlexContainerAlignCenter } from '../SharedStyles.styled';
import { StyledCircleContainer } from '../UserCircle/UserCircle.styled';

export const StyledIssuePanel = styled(StyledFlexContainerAlignCenter)`
  padding: 0.6rem 1.2rem;
  background-color: ${(props) => props.theme.surfaceSecondary};
  border-radius: 0.3rem;
  font-size: 1.6rem;
  transition: all 0.4s ease;
  margin-bottom: 1rem;
  height: 4.2rem;

  &,
  & > div,
  & > span {
    cursor: pointer;
  }

  & ${StyledIcon}, & ${StyledPriorityBadge}, & strong {
    margin-right: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    color: ${(props) => props.theme.textOnPrimary};
    transform: translateY(-0.2rem);
  }
`;

export const StyledRightContainer = styled(StyledFlexContainerAlignCenter)`
  margin-left: auto;

  & ${StyledCircleContainer} {
    margin-left: 1rem;
  }
`;

export const StyledSubtasksContainer = styled(StyledFlexColumnContainer)`
  padding-left: 2rem;

  & ${StyledIssuePanel} {
    background-color: ${(props) => props.theme.surfaceTertiary};
  }
`;
