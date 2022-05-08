import styled from 'styled-components';
import { StyledBadgeContainer } from '../MethodologyBadge/MethodologyBadge.styled';

export const StyledProjectPanel = styled.div`
  display: flex;
  padding: 0.8rem 1.2rem;
  background-color: ${(props) => props.theme.surfaceSecondary};
  border-radius: 0.3rem;
  font-size: 1.6rem;
  transition: all 0.4s ease;
  cursor: pointer;

  & > ${StyledBadgeContainer} {
    margin-right: 1rem;
  }

  & > p {
    &:last-child {
      margin-left: auto;
    }
  }

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    color: ${(props) => props.theme.textOnPrimary};
    transform: translateY(-0.2rem);
  }
`;

export const StyledProjectName = styled.p``;
