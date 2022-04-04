import React from 'react';
import { Container } from 'Hooks/useLoading';
import { Heading6 } from 'Shared/Typography';

import {
  StyledDialogWrapper,
  StyledFooterWrapper,
  StyledHeaderWrapper
} from './LoadingModalDialog.styled';

interface Props {
  isLoading: boolean;
  header: JSX.Element | string;
  footer: JSX.Element;
  children: React.ReactNode;
}

export const LoadingModalDialog = ({ isLoading, header, footer, children }: Props): JSX.Element => {
  const renderHeader = (): JSX.Element => {
    if (typeof header === 'string') {
      return <Heading6>{header}</Heading6>;
    }

    return header;
  };

  return (
    <React.Fragment>
      <Container isLoading={isLoading} />
      <StyledDialogWrapper>
        <StyledHeaderWrapper>{renderHeader()}</StyledHeaderWrapper>
        {children}
        <StyledFooterWrapper>{footer}</StyledFooterWrapper>
      </StyledDialogWrapper>
    </React.Fragment>
  );
};
