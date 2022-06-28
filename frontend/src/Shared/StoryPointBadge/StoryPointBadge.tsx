import React from 'react';
import { StyledBadge } from './StoryPointBadge.styled';
import { useTranslation } from 'react-i18next';

interface Props {
  value: number;
}

export const StoryPointBadge = ({ value }: Props): JSX.Element => {
  const { t } = useTranslation();

  return <StyledBadge title={t('general.storyPoints')}>{value}</StyledBadge>;
};
