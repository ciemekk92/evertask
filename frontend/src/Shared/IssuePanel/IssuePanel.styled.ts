import styled from 'styled-components';
import { StyledIcon } from 'Shared/Elements/Icons/Shared.styled';
import { StyledPriorityBadge } from '../PriorityBadge/PriorityBadge.styled';
import { StyledFlexContainerAlignCenter } from '../SharedStyles.styled';

export const StyledIssuePanel = styled(StyledFlexContainerAlignCenter)`
  padding: 0.6rem 1.2rem;
  background-color: ${(props) => props.theme.surfaceSecondary};
  border-radius: 0.3rem;
  font-size: 1.6rem;
  transition: all 0.4s ease;
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  & ${StyledIcon}, & ${StyledPriorityBadge} {
    margin-right: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    color: ${(props) => props.theme.textOnPrimary};
    transform: translateY(-0.2rem);
  }
`;

export const StyledIssueName = styled.p``;
