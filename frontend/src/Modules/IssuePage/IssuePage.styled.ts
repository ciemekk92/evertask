import styled from 'styled-components';

export const StyledHeaderWrapper = styled.div`
  display: flex;
`;

export const StyledCenterSectionContainer = styled.div`
  width: 63%;
  display: flex;
  flex-direction: column;
  height: max-content;

  &,
  & > div {
    border-radius: 0.3rem;
  }
`;

export const StyledRightSectionContainer = styled(StyledCenterSectionContainer)`
  width: 33%;
`;
