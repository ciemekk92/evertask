import styled from 'styled-components';
import React from 'react';
import { StyledFlexColumnContainer, StyledFlexContainer } from 'Shared/SharedStyles.styled';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly alignItems?: string;
}

export const StyledFieldContainer = styled(StyledFlexColumnContainer)`
  margin-bottom: 2rem;

  & input {
    margin-bottom: 0;
  }
`;

export const StyledLabelAndInputContainer = styled(StyledFlexContainer)<ContainerProps>`
  align-items: ${({ alignItems }) => alignItems ?? 'baseline'};

  & input,
  & textarea {
    width: 100%;
  }
`;

export const StyledChildrenContainer = styled(StyledFlexContainer)`
  width: 100%;

  & > div {
    &:not(:last-child) {
      margin-right: 1.5rem;
    }
  }
`;

export const StyledFormLabel = styled.strong`
  font-size: 1.6rem;
  min-width: 18rem;
`;

export const StyledRequiredMark = styled.span`
  color: ${(props) => props.theme.error};
  font-size: 2rem;
`;
