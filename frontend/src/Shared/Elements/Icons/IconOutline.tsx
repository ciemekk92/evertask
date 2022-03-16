import React from 'react';
import classNames from 'classnames';
import { ICON_SIZE } from 'Shared/constants';
import { StyledIcon } from './Shared.styled';

interface Props extends React.HTMLAttributes<HTMLSpanElement> {
  iconName: string;
  iconSize?: ICON_SIZE;
}

export const IconOutline = ({
  iconName,
  iconSize = ICON_SIZE.MEDIUM,
  ...props
}: Props): JSX.Element => {
  const finalClassName = classNames('material-icons-outlined', {
    'md-18': iconSize === ICON_SIZE.SMALL,
    'md-24': iconSize === ICON_SIZE.MEDIUM,
    'md-36': iconSize === ICON_SIZE.LARGE,
    'md-48': iconSize === ICON_SIZE.XL,
    'md-96': iconSize === ICON_SIZE.XXL
  });

  return (
    <StyledIcon {...props} className={finalClassName}>
      {iconName}
    </StyledIcon>
  );
};
