import styled from 'styled-components';
import { StyledFlexColumnContainer } from 'Shared/SharedStyles.styled';

const StyledColumn = styled(StyledFlexColumnContainer)`
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
