import styled from 'styled-components';
import { StyledFlexColumnContainerAlignCenter } from 'Shared/SharedStyles.styled';

export const StyledChartContainer = styled(StyledFlexColumnContainerAlignCenter)`
  font-size: 1.6rem;
  padding: 2rem 0;

  & svg {
    overflow: visible;
  }
`;
