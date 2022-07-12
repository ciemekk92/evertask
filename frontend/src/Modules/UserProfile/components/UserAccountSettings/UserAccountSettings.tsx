import React from 'react';
import { useDispatch } from 'react-redux';
import { HorizontalPageWrapper } from 'Shared/PageWrappers';
import { actionCreators } from 'Stores/User';
import { AvatarSection, PersonalInfoSection } from './components';

export const UserAccountSettings = (): JSX.Element => {
  const dispatch = useDispatch();

  const handleRefreshingUserDetails = () => {
    dispatch(actionCreators.getCurrentUserDetails());
  };

  return (
    <HorizontalPageWrapper alignItems="unset" justifyContent="space-between">
      <AvatarSection onUpdate={handleRefreshingUserDetails} />
      <PersonalInfoSection onUpdate={handleRefreshingUserDetails} />
    </HorizontalPageWrapper>
  );
};
