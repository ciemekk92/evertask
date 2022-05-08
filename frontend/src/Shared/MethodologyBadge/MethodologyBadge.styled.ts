import React from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly isAgile: boolean;
}

export const StyledBadgeContainer = styled.div<Props>`
  width: 5.4rem;
  height: 2rem;
  display: flex;
  background-color: ${({ theme, isAgile }) => (isAgile ? theme.primary : theme.primaryDark)};
  color: ${(props) => props.theme.textOnPrimary};
  padding: 0.3rem 0.5rem;
  border-radius: 0.3rem;
  font-weight: 600;
  font-size: 1rem;
  justify-content: center;
  align-items: center;
  cursor: default;
  box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.4);
`;
