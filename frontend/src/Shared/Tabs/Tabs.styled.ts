import styled from 'styled-components';
import React from 'react';
import { StyledButtonOutline } from '../Elements/Buttons/ButtonOutline/ButtonOutline.styled';

interface MenuItemProps extends React.HTMLAttributes<HTMLLIElement> {
  readonly isActive: boolean;
}

export const StyledTabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const StyledTabsMenuContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  width: 100%;
  padding: 1rem 0;

  & > li {
    &:not(:last-child) {
      margin-right: 2rem;
    }
  }
`;

export const StyledTabsNav = styled.nav`
  border-bottom: 1px solid ${(props) => props.theme.primaryDark};
`;

export const StyledTabsMenuItem = styled.li<MenuItemProps>`
  & > ${StyledButtonOutline} {
    background-color: ${(props) => (props.isActive ? props.theme.primaryDark : 'transparent')};
    font-weight: ${(props) => (props.isActive ? 700 : 400)};
  }
`;

export const StyledPanelContainer = styled.div`
  width: 100%;
  padding-top: 1rem;
`;
