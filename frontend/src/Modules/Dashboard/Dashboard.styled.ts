import styled from 'styled-components';

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
  background-color: ${(props) => props.theme.surface};
  padding: 1rem;
`;

export const StyledSectionRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
