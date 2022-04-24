import styled from 'styled-components';

export const StyledInputContainer = styled.div`
  position: relative;

  & span {
    position: absolute;
    top: 50%;
    right: 2%;
    transform: translate(0, -50%);
    cursor: pointer;
  }
`;

export const StyledInput = styled.input`
  height: 4.8rem;
  width: 100%;
  min-width: 24rem;
  border: 1px solid ${(props) => props.theme.primary};
  background-color: ${(props) => props.theme.surface};
  color: ${(props) => props.theme.primaryText};
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  font-size: 1.8rem;
  outline: none;

  &::placeholder {
    color: ${(props) => props.theme.secondaryText};
  }
`;
