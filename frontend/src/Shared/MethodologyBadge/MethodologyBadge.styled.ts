import React from 'react';
import styled from 'styled-components';
import { StyledBadge, StyledFlexContainerAllCenter } from '../SharedStyles.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  readonly isAgile: boolean;
}

export const StyledBadgeContainer = styled(StyledFlexContainerAllCenter)<Props>`
  ${StyledBadge};
  background-color: ${({ theme, isAgile }) => (isAgile ? theme.primary : theme.primaryDark)};
  color: ${(props) => props.theme.textOnPrimary};
`;
