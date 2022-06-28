import styled from 'styled-components';

export const StyledDroppableWrapper = styled.div`
  padding: 1rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};

  &:not(:last-child) {
    margin-bottom: 2rem;
  }

  & h6 {
    margin-bottom: 1rem;
  }
`;
