import React from 'react';
import { StyledBadge } from './StoryPointBadge.styled';
import { useTranslation } from 'react-i18next';

interface Props {
  value: Nullable<number>;
}

export const StoryPointBadge = ({ value }: Props): Nullable<JSX.Element> => {
  const { t } = useTranslation();

  if (value === null) {
    return null;
  }

  return <StyledBadge title={t('general.storyPoints')}>{value}</StyledBadge>;
};
