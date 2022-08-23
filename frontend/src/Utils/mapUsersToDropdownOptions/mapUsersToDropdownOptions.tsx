import React from 'react';
import { UserDropdownLabel } from 'Shared/UserDropdownLabel';
import { User } from 'Types/User';
import i18n from '../../i18n';

export const mapUsersToDropdownOptions = (users: User.UserEntity[]) => {
  const emptyOption = {
    searchable: i18n.t('issuePage.right.unassigned'),
    label: <UserDropdownLabel user={null} />,
    value: null
  };

  const members = users.map((user: User.UserEntity) => {
    const fullName = `${user.firstName} ${user.lastName}`;

    return {
      searchable: fullName,
      label: <UserDropdownLabel user={user} />,
      value: user.id
    };
  });

  return [emptyOption, ...members];
};
