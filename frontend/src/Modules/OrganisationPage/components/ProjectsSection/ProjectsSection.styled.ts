import styled from 'styled-components';

export const StyledProjectsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledProjectPanel = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  font-size: 1.6rem;
  align-items: center;

  & > div:first-child {
    margin-right: 1rem;
  }
`;
