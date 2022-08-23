import React from 'react';
import { UserCircle } from 'Shared/UserCircle';
import { User } from 'Types/User';

export const renderUserCircle = (user: Nullable<User.UserBasicEntity>): Nullable<JSX.Element> => {
  if (!user) {
    return null;
  }

  const label = `${user.firstName} ${user.lastName}`;
  return <UserCircle label={label} imageSrc={user.avatar} />;
};
