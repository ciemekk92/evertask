import React from 'react';
import { useTranslation } from 'react-i18next';
import { ISSUE_STATUS } from '../constants';
import { StyledStatusBadge } from './StatusBadge.styled';

interface Props {
  status: ISSUE_STATUS;
}

export const StatusBadge = ({ status }: Props): JSX.Element => {
  const { t } = useTranslation();
  const statusLabel: string = status.replaceAll('_', ' ');

  return (
    <StyledStatusBadge title={t('general.issueStatusTitle')} status={status}>
      {statusLabel}
    </StyledStatusBadge>
  );
};
