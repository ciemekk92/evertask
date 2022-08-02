import React from 'react';
import styled from 'styled-components';
import { Form } from 'Shared/Elements/Form';
import { StyledLinkButton } from 'Shared/Elements/Buttons/ButtonLikeLink/ButtonLikeLink.styled';
import {
  StyledFlexColumnContainer,
  StyledFlexContainer,
  StyledFlexContainerAlignCenter,
  StyledFlexContainerSpaceBetween
} from 'Shared/SharedStyles.styled';
import { StyledButton } from 'Shared/Elements/Buttons/IconButton/IconButton.styled';

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  readonly isReply?: boolean;
  readonly isChildPanel?: boolean;
}

export const StyledCommentWrapper = styled(StyledFlexColumnContainer)<WrapperProps>`
  font-size: 1.6rem;
  width: ${(props) => (props.isReply || props.isChildPanel ? '96%' : 'inherit')};
  margin-left: ${(props) => (props.isReply || props.isChildPanel ? 'auto' : 'inherit')};
  margin-bottom: ${(props) =>
    (!props.isReply && !props.isChildPanel) || props.isReply ? '0.4rem' : 'inherit'};

  & ${Form} {
    margin-top: 0.4rem;
  }

  & > ${StyledFlexColumnContainer} {
    padding-top: 0.4rem;
    padding-bottom: ${(props) => (props.isReply || props.isChildPanel ? '0.4rem' : 'inherit')};
  }

  & ${StyledLinkButton} {
    margin-top: 0.4rem;
  }

  & ${StyledButton}:not(:last-child) {
    margin-right: 1rem;
  }
`;

export const StyledSingleCommentWrapper = styled(StyledFlexColumnContainer)<WrapperProps>`
  background-color: ${(props) => props.theme.surfaceSecondary};
  padding: 1rem;
  border-radius: 0.3rem;

  & ${StyledFlexContainer}:last-child {
    margin-bottom: 0.6rem;
  }
`;

export const StyledCommentHeadingRow = styled(StyledFlexContainerSpaceBetween)`
  margin-bottom: 1rem;
`;

export const StyledCommentContent = styled.div`
  margin-bottom: 1rem;

  & ol,
  & ul {
    margin-left: 1.6rem;
  }
`;

export const StyledUserField = styled(StyledFlexContainerAlignCenter)`
  & > p {
    margin-left: 1rem;
  }
`;
