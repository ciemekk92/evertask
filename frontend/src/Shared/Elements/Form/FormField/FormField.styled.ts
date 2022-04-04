import styled from 'styled-components';

export const StyledFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  & input {
    margin-bottom: 0;
  }
`;

export const StyledLabelAndInputContainer = styled.div`
  display: flex;
  align-items: baseline;

  & input,
  & textarea {
    width: 100%;
  }
`;

export const StyledFormLabel = styled.p`
  font-size: 1.6rem;
  width: 18rem;
`;
