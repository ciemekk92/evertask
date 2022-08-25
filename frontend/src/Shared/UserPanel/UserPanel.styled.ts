import styled from 'styled-components';
import { StyledFlexContainerAlignCenter } from '../SharedStyles.styled';

export const StyledPanelContainer = styled(StyledFlexContainerAlignCenter)`
  background-color: ${(props) => props.theme.surfaceSecondary};
  padding: 0.6rem 1rem;
  border-radius: 0.3rem;
`;

export const StyledNameLabel = styled.div`
  font-size: 1.6rem;
  margin-left: 1rem;
`;
