import React from 'react';
import { TabPanelProps } from './fixtures';
import { StyledPanelContainer } from './Tabs.styled';

export const TabsPanel = ({ children }: TabPanelProps): JSX.Element => (
  <StyledPanelContainer>{children}</StyledPanelContainer>
);
