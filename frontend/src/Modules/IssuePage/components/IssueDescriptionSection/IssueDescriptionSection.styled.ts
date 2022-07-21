import styled from 'styled-components';

export const StyledDescriptionContainer = styled.div`
  font-size: 1.6rem;
  padding: 1rem;
  white-space: pre-wrap;
  max-height: 40rem;
  overflow: auto;

  & > p {
    margin-bottom: 1rem;
  }
`;
