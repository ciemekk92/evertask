import React from 'react';
import { Heading6 } from 'Shared/Typography';

import {
  StyledDialogWrapper,
  StyledFooterWrapper,
  StyledHeaderWrapper
} from './ModalDialog.styled';

interface Props {
  header: JSX.Element | string;
  footer: JSX.Element;
  children: React.ReactNode;
}

export const ModalDialog = ({ header, footer, children }: Props): JSX.Element => {
  const renderHeader = (): JSX.Element => {
    if (typeof header === 'string') {
      return <Heading6>{header}</Heading6>;
    }

    return header;
  };

  return (
    <React.Fragment>
      <StyledDialogWrapper>
        <StyledHeaderWrapper>{renderHeader()}</StyledHeaderWrapper>
        {children}
        <StyledFooterWrapper>{footer}</StyledFooterWrapper>
      </StyledDialogWrapper>
    </React.Fragment>
  );
};
