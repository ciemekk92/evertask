import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconOutline } from 'Shared/Elements/Icons';
import { HorizontalPageWrapper } from 'Shared/PageWrappers';
import { Heading4 } from 'Shared/Typography';
import { ICON_SIZE } from 'Shared/constants';
import { ERROR_TYPE } from './fixtures';
import { ErrorPageWrapper } from './ErrorPage.styled';

interface Props {
  type: ERROR_TYPE;
}

export const ErrorPage = ({ type }: Props): JSX.Element => {
  const { t } = useTranslation();

  const getIconName = React.useCallback((): string => {
    return {
      [ERROR_TYPE.FORBIDDEN]: 'report',
      [ERROR_TYPE.NOT_FOUND]: 'search_off',
      [ERROR_TYPE.UNAUTHORIZED]: 'lock'
    }[type];
  }, [type]);

  return (
    <ErrorPageWrapper>
      <HorizontalPageWrapper>
        <IconOutline iconName={getIconName()} iconSize={ICON_SIZE.XXL} />
        <Heading4>{t(`error.${type}.title`)}</Heading4>
      </HorizontalPageWrapper>
      <p>{t(`error.${type}.content`)}</p>
    </ErrorPageWrapper>
  );
};
