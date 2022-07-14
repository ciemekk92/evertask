import styled from 'styled-components';

export const StyledSecurityContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: max-content;
  padding: 2rem;
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surface};

  & h6 {
    align-self: start;
    margin-bottom: 2rem;
  }
`;

export const StyledHorizontalField = styled.div`
  display: flex;
  font-size: 1.6rem;
  width: 100%;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;
