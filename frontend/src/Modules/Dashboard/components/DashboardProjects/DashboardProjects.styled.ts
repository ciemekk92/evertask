import styled from 'styled-components';

export const StyledProjectPanel = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.8rem 1.2rem;
  background-color: ${(props) => props.theme.surfaceSecondary};
  border-radius: 0.3rem;
  font-size: 1.6rem;
  transition: all 0.6s ease;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    transform: translateY(-0.2rem);
  }
`;
