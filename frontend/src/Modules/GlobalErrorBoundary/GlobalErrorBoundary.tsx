import React from 'react';
import { Translation } from 'react-i18next';
import { Heading4 } from 'Shared/Typography';
import { IconOutline } from 'Shared/Elements/Icons';
import { ICON_SIZE } from 'Shared/constants';
import { HorizontalPageWrapper } from 'Shared/PageWrappers';
import { BoundaryWrapper } from './GlobalErrorBoundary.styled';

interface Props extends React.ComponentProps<Unrestricted> {}

interface State {
  hasError: boolean;
}

export class GlobalErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  private static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Translation>
          {(t) => (
            <BoundaryWrapper>
              <HorizontalPageWrapper>
                <IconOutline iconName="warning" iconSize={ICON_SIZE.XXL} />
                <Heading4>{t('error.title')}</Heading4>
              </HorizontalPageWrapper>
              <p>{t('error.content')}</p>
            </BoundaryWrapper>
          )}
        </Translation>
      );
    }

    return this.props.children;
  }
}
