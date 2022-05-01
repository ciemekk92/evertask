import styled from 'styled-components';

export const StyledCheck = styled.div`
  display: block;
  position: absolute;
  height: 20px;
  width: 20px;
  border: 3px solid #aaa;
  transition: border 0.25s ease;
  z-index: 5;
  right: 1rem;
  border-radius: 100%;

  &::before {
    display: block;
    position: absolute;
    content: '';
    border-radius: 100%;
    height: 8px;
    width: 8px;
    top: 3px;
    left: 3px;
    margin: auto;
    transition: background 0.25s ease;
  }
`;

export const StyledContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;

  &:hover label {
    color: ${(props) => props.theme.primaryText};
  }

  &:hover ${StyledCheck} {
    border: 3px solid ${(props) => props.theme.primaryLight};
  }
`;

export const StyledRadio = styled.input`
  position: absolute;
  visibility: hidden;

  &:checked ~ ${StyledCheck} {
    border: 3px solid ${(props) => props.theme.primary};
  }

  &:checked ~ ${StyledCheck}::before {
    background: ${(props) => props.theme.primary};
  }

  &:checked ~ label {
    color: ${(props) => props.theme.primary};
  }
`;

export const StyledLabel = styled.label`
  display: block;
  position: relative;
  transition: all 0.4s ease;
  font-size: 1.6rem;
  height: 3rem;
  z-index: 9;
  margin: 0.7rem auto 0 0.7rem;
`;
