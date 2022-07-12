import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserModel } from 'Models/UserModel';
import { HorizontalPageWrapper } from 'Shared/PageWrappers';

export const UserInterface = (): JSX.Element => {
  const { t } = useTranslation();
  const currentUser = UserModel.currentUserValue;

  return (
    <HorizontalPageWrapper
      alignItems="unset"
      justifyContent="space-between"
    ></HorizontalPageWrapper>
  );
};
