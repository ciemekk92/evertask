import styled from 'styled-components';
import { StyledBadge, StyledFlexContainerAllCenter } from '../SharedStyles.styled';

export const Badge = styled(StyledFlexContainerAllCenter)`
  ${StyledBadge};
  background-color: ${({ theme }) => theme.primaryDark};
  color: ${(props) => props.theme.textOnPrimary};
  text-transform: uppercase;
`;
