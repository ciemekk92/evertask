import styled from 'styled-components';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';

export const StyledInfoField = styled(StyledFlexContainer)`
  width: 100%;
  padding: 1rem;
  align-items: baseline;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  & > div {
    font-size: 1.6rem;
  }
`;

export const StyledInfoLabel = styled.div`
  font-weight: bold;
  margin-right: 1rem;
  width: 20%;
`;

export const StyledInfoContent = styled.div`
  overflow: visible;
  width: 80%;
`;
