import React from 'react';
import styled from 'styled-components';
import {
  StyledDropdownContainer,
  StyledDropdownOptionsList
} from '../DropdownMenu/DropdownMenu.styled';
import { InputStyles } from '../TextInput';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isOpen: boolean;
}

export const StyledDropdownWithSearchContainer = styled(StyledDropdownContainer)<ContainerProps>`
  margin-left: auto;
`;

export const StyledSearchInput = styled.input`
  ${InputStyles};
  margin: 1rem;
`;

export const StyledDropdownListWithSearchContainer = styled(StyledDropdownOptionsList)`
  border-radius: 0.3rem;
  background-color: ${(props) => props.theme.surfaceSecondary};

  & button {
    width: 27rem;
    height: 3.8rem;
  }
`;
