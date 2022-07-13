import React from 'react';
import { useTranslation } from 'react-i18next';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { Tabs } from 'Shared/Tabs';
import * as Components from './components';

export const UserProfile = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <VerticalPageWrapper alignItems="unset">
      <Heading5>{t('profile.title')}</Heading5>
      <Tabs>
        <Tabs.Panel title={t('profile.accountSettings.title')}>
          <Components.UserAccountSettings />
        </Tabs.Panel>
        <Tabs.Panel title={t('profile.security.title')}>
          <Components.UserSecurity />
        </Tabs.Panel>
        <Tabs.Panel title={t('profile.interface.title')}>
          <Components.UserInterface />
        </Tabs.Panel>
      </Tabs>
    </VerticalPageWrapper>
  );
};
