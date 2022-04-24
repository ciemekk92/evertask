import styled from 'styled-components';

export const StyledInfoField = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }

  & > div {
    font-size: 1.8rem;
  }
`;

export const StyledInfoLabel = styled.div`
  font-weight: bold;
  margin-right: 1rem;
`;

export const StyledInfoContent = styled.div``;
export const StyledDescriptionField = styled.div`
  padding: 1rem;
  font-size: 1.8rem;
`;
