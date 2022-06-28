import styled from 'styled-components';

export const StyledDroppableWrapper = styled.div`
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

export const StyledHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h6 {
    margin-bottom: 1rem;
  }
`;
