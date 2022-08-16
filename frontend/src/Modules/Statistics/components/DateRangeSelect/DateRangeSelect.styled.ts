import styled from 'styled-components';
import {
  StyledFlexColumnContainerAlignCenter,
  StyledFlexContainerSpaceBetween
} from 'Shared/SharedStyles.styled';

export const StyledDateRangeWrapper = styled(StyledFlexColumnContainerAlignCenter)`
  margin-bottom: 1.5rem;
  width: 100%;
  align-items: center;
`;

export const StyledPickersContainer = styled(StyledFlexContainerSpaceBetween)`
  width: 55%;
`;
