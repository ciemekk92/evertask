import styled from 'styled-components';
import {
  StyledFlexColumnContainer,
  StyledFlexContainerAlignCenterSpaceBetween
} from 'Shared/SharedStyles.styled';

export const StyledPanelContainer = styled(StyledFlexContainerAlignCenterSpaceBetween)`
  background-color: ${(props) => props.theme.surface};
  font-size: 1.6rem;
  padding: 1rem;
  border-radius: 0.3rem;
`;

export const StyledInfoContainer = styled(StyledFlexColumnContainer)`
  & > p {
    margin-bottom: 0.3rem;
  }
`;

export const StyledDate = styled.div`
  font-size: 1.3rem;
`;
