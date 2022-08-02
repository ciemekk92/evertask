import styled from 'styled-components';
import { StyledFlexColumnContainer } from 'Shared/SharedStyles.styled';

export const SidebarBody = styled(StyledFlexColumnContainer)`
  position: fixed;
  background-color: ${(props) => props.theme.surfaceTransparent};
  padding: 1rem 0;
  width: 7.2rem;
  height: 100%;
  overflow: hidden;
  z-index: 1000;
  transition: all 0.4s ease;

  &:hover {
    width: 24rem;
    overflow: visible;
    background-color: ${(props) => props.theme.surface};
    box-shadow: 0.3rem 0 0.5rem rgba(0, 0, 0, 0.4);
  }
`;

export const SidebarList = styled.ul`
  list-style: none;
`;
