import styled from 'styled-components';
import { StyledLink } from '../../Shared/StyledLink';

export const StyledDashboardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2rem;
`;

export const StyledDashboardColumn = styled.div`
  display: flex;
  width: 49%;
  flex-direction: column;
`;

export const StyledSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

export const StyledSectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`;

export const StyledHeaderRow = styled(StyledSectionRow)`
  height: 4rem;
  border-bottom: 1px solid ${(props) => props.theme.primary};
`;
