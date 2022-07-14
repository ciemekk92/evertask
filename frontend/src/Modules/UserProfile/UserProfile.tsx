import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { VerticalPageWrapper, HorizontalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { actionCreators } from 'Stores/User';
import * as Components from './components';
import { StyledSmallColumn, StyledBigColumn } from './UserProfile.styled';

export const UserProfile = (): JSX.Element => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const handleRefreshingUserDetails = () => {
    dispatch(actionCreators.getCurrentUserDetails());
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <Heading5>{t('profile.title')}</Heading5>
      <HorizontalPageWrapper alignItems="unset" justifyContent="space-between">
        <StyledSmallColumn>
          <Components.AvatarSection onUpdate={handleRefreshingUserDetails} />
          <Components.UserSecurity />
        </StyledSmallColumn>
        <StyledBigColumn>
          <Components.PersonalInfoSection onUpdate={handleRefreshingUserDetails} />
          <Components.UserInterface />
        </StyledBigColumn>
      </HorizontalPageWrapper>
    </VerticalPageWrapper>
  );
};
