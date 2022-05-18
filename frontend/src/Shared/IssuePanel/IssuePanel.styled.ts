import styled from 'styled-components';
import { StyledIcon } from 'Shared/Elements/Icons/Shared.styled';
import { StyledPriorityBadge } from '../PriorityBadge/PriorityBadge.styled';

export const StyledIssuePanel = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  background-color: ${(props) => props.theme.surfaceSecondary};
  border-radius: 0.3rem;
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
  transition: all 0.4s ease;
  cursor: pointer;

  & ${StyledIcon}, & ${StyledPriorityBadge} {
    margin-right: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    color: ${(props) => props.theme.textOnPrimary};
    transform: translateY(-0.2rem);
  }
`;

export const StyledCodeId = styled.strong``;

export const StyledIssueName = styled.p``;
