import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledEmptySectionContainer } from './EmptySection.styled';

export const EmptySection = (): JSX.Element => {
  const { t } = useTranslation();

  return <StyledEmptySectionContainer>{t('backlog.emptySection')}</StyledEmptySectionContainer>;
};
