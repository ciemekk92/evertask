import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledPriorityBadge } from './PriorityBadge.styled';
import { ISSUE_PRIORITY } from '../constants';

interface Props {
  priority: ISSUE_PRIORITY;
}

export const PriorityBadge = ({ priority }: Props): JSX.Element => {
  const { t } = useTranslation();

  const priorityLabel: string = t(`priorityBadge.label.${priority}`);

  return <StyledPriorityBadge priority={priority}>{priorityLabel}</StyledPriorityBadge>;
};
