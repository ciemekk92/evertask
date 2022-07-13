import styled from 'styled-components';
import React from 'react';
import { DROPDOWN_MENU_POSITION } from './fixtures';
import { StyledIcon } from '../Icons/Shared.styled';
import { StyledDropdownOption } from '../SingleSelectDropdown/SingleSelectDropdown.styled';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
}

interface OptionsListProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly position?: DROPDOWN_MENU_POSITION;
}

export const StyledDropdownContainer = styled.div<ContainerProps>`
  display: flex;
  position: relative;
  z-index: ${({ isOpen }) => (isOpen ? 10 : 5)};

  & ${StyledIcon}, & ${StyledIcon}:hover {
    z-index: ${({ isOpen }) => (isOpen ? 5 : 'unset')};
    cursor: pointer;
    margin-right: 0;
  }
`;

export const StyledDropdownOptionsList = styled.div<OptionsListProps>`
  width: max-content;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  ${(props) => {
    switch (props.position) {
      case DROPDOWN_MENU_POSITION.BOTTOM_LEFT:
        return 'right: 4rem; top: 3rem;';
      case DROPDOWN_MENU_POSITION.TOP_LEFT:
        return 'right: 4rem; bottom: 3rem;';
      case DROPDOWN_MENU_POSITION.TOP_RIGHT:
        return 'left: 5rem; bottom: 3rem;';
      default:
        return 'left: 5rem; top: 3rem;';
    }
  }}
  box-shadow: 0 0.2rem 0.3rem 0.2rem rgba(0, 0, 0, 0.3);
  z-index: 10;

  & ${StyledDropdownOption} {
    border-top: none;
  }
`;
