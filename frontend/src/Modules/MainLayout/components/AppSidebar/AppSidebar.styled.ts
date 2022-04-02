import styled from 'styled-components';

export const SidebarBody = styled.div`
  display: flex;
  flex-direction: column;
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
    //clip-path: inset(0 -15px 0 -15px);
  }
`;

export const SidebarList = styled.ul`
  list-style: none;
`;

export const SidebarListItem = styled.li`
  position: relative;
  display: block;
  width: 20rem;
  white-space: pre-wrap;
  margin-left: 0.8rem;
`;
