import styled from 'styled-components';
import { StyledFlexColumnContainer } from 'Shared/SharedStyles.styled';

export const StyledCenterSectionContainer = styled(StyledFlexColumnContainer)`
  width: 63%;
  height: max-content;

  &,
  & > div {
    border-radius: 0.3rem;
  }
`;

export const StyledRightSectionContainer = styled(StyledCenterSectionContainer)`
  width: 33%;
`;
