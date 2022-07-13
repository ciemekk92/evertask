import styled from 'styled-components';

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${(props) => props.theme.primaryText};
  border: none;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  min-height: 3.2rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.4s ease;

  &,
  & span {
    cursor: pointer;
  }

  & p {
    margin-bottom: 0.3rem;
    margin-left: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
    color: ${(props) => props.theme.textOnPrimary};
  }
`;
