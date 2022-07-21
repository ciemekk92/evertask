import styled from 'styled-components';

export const StyledField = styled.div`
  display: flex;
  font-size: 1.6rem;
  padding: 1rem 3rem;
  width: 100%;
  height: 5rem;
  align-items: center;

  & > p {
    display: flex;
    align-items: center;

    & > span {
      margin-right: 1rem;
    }
  }
`;

export const StyledFieldLabel = styled.p`
  width: 50%;
`;
