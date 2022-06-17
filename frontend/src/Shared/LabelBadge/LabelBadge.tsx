import React from 'react';
import { Badge } from './LabelBadge.styled';

interface Props {
  label: string;
}

export const LabelBadge = ({ label }: Props): JSX.Element => {
  return <Badge>{label}</Badge>;
};
