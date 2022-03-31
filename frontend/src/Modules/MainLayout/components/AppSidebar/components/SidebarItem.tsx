import React from 'react';
import { useTranslation } from 'react-i18next';
import { ICON_SIZE } from 'Shared/constants';
import { IconOutline } from 'Shared/Elements/Icons';
import { StyledLink } from 'Shared/StyledLink';
import { StyledSidebarItem } from './SidebarItem.styled';

interface Props {
  name: string;
  iconName: string;
  route: string;
}

export const SidebarItem = ({ name, iconName, route }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledLink to={route}>
      <StyledSidebarItem>
        <IconOutline iconName={iconName} iconSize={ICON_SIZE.XL} />
        <p>{t(`sidebar.link.${name}`)}</p>
      </StyledSidebarItem>
    </StyledLink>
  );
};
