import styled from 'styled-components';
import { StyledIcon } from '../Icons/Shared.styled';

interface ContainerProps {
  readonly isOpen: boolean;
}

export const StyledDropdownContainer = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  margin-right: 1rem;
  z-index: ${({ isOpen }) => (isOpen ? 10 : 5)};

  & ${StyledIcon}, & ${StyledIcon}:hover {
    z-index: ${({ isOpen }) => (isOpen ? 5 : 'unset')};
  }
`;

export const StyledDropdownOptionsList = styled.div`
  width: 18rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 4rem;
  z-index: 10;
`;
