import styled from 'styled-components';

export const StyledLinkButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => (props.disabled ? props.theme.disabledText : props.theme.primary)};
  font-size: 1.6rem;
  cursor: pointer;

  & a {
    transition: all 0.4s ease;
  }

  &:hover {
    & a {
      color: ${(props) => (!props.disabled ? props.theme.primaryText : null)};
    }
  }
`;
