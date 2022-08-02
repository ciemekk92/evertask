import styled from 'styled-components';
import { Badge } from 'Shared/LabelBadge/LabelBadge.styled';
import { StyledFlexContainerAllCenter } from 'Shared/SharedStyles.styled';

export const StyledSprintPanel = styled(StyledFlexContainerAllCenter)`
  padding: 0.4rem 1.2rem;
  background-color: ${(props) => props.theme.surfaceSecondary};
  border-radius: 0.3rem;
  font-size: 1.6rem;
  transition: all 0.4s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.primary};
    color: ${(props) => props.theme.textOnPrimary};
    transform: translateY(-0.2rem);
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  & ${Badge} {
    margin-left: 1rem;
  }
`;

export const StyledDateLabel = styled.p`
  margin-left: auto;
  margin-right: 1rem;
  font-size: 1.3rem;
`;
