import styled from 'styled-components';

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;

  & > div:not(:last-child) {
    margin-bottom: 3rem;
  }
`;

export const StyledSmallColumn = styled(StyledColumn)`
  width: 39%;
`;

export const StyledBigColumn = styled(StyledColumn)`
  width: 59%;
`;
