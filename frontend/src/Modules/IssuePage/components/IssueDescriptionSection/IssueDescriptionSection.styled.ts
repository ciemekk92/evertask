import styled from 'styled-components';

export const StyledDescriptionContainer = styled.div`
  font-size: 1.6rem;
  padding: 1rem 1.5rem;
  white-space: pre-wrap;
  max-height: 40rem;
  overflow: auto;
  line-height: 0.67;

  & > p {
    margin-bottom: 1rem;
  }
`;
