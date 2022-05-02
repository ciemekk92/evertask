import React from 'react';
import { PROJECT_METHODOLOGIES } from '../constants';
import { StyledBadgeContainer } from './MethodologyBadge.styled';

interface Props {
  label: PROJECT_METHODOLOGIES;
}

export const MethodologyBadge = ({ label }: Props): JSX.Element => {
  return (
    <StyledBadgeContainer isAgile={label === PROJECT_METHODOLOGIES.AGILE}>
      {label}
    </StyledBadgeContainer>
  );
};
