import styled from 'styled-components';
import React from 'react';
import { DROPDOWN_MENU_POSITION } from './fixtures';
import { StyledIcon } from '../Icons/Shared.styled';
import {StyledDropdownOption} from "../SingleSelectDropdown/SingleSelectDropdown.styled";

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
  width: 18rem;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  ${(props) => (props.position === DROPDOWN_MENU_POSITION.LEFT ? 'right: 3rem;' : 'left: 4rem;')}
  z-index: 10;
  
  & ${StyledDropdownOption} {
    border-top: none;
  } 
`;
