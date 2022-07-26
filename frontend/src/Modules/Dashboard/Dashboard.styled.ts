import styled from 'styled-components';
import { StyledLink } from 'Shared/StyledLink';
import {
  StyledFlexColumnContainer,
  StyledFlexContainerSpaceBetween
} from 'Shared/SharedStyles.styled';

export const StyledDashboardWrapper = styled(StyledFlexContainerSpaceBetween)`
  width: 100%;
  padding: 2rem;
`;

export const StyledDashboardColumn = styled(StyledFlexColumnContainer)`
  width: 49%;
`;

export const StyledSectionWrapper = styled(StyledFlexColumnContainer)`
  width: 100%;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};
  padding: 2rem;

  & ${StyledLink} {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

export const StyledSectionRow = styled(StyledFlexContainerSpaceBetween)`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export const StyledHeaderRow = styled(StyledSectionRow)`
  height: 4rem;
  border-bottom: 1px solid ${(props) => props.theme.primary};
`;
