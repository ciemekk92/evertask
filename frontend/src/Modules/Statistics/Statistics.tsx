import React from 'react';
import { useTranslation } from 'react-i18next';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Tabs } from 'Shared/Tabs';
import { Heading5 } from 'Shared/Typography';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';
import { SingleSelectDropdown } from '../../Shared/Elements/SingleSelectDropdown';

export const Statistics = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <VerticalPageWrapper alignItems="unset">
      <StyledFlexContainer>
        <Heading5>{t('statistics.title')}</Heading5>
      </StyledFlexContainer>
      {/*<SingleSelectDropdown options={} value={} onChange={} />*/}
      <Tabs>
        <Tabs.Panel title={'TEST'}>TEST</Tabs.Panel>
        <Tabs.Panel title={'TEST2'}>TEST2</Tabs.Panel>
      </Tabs>
    </VerticalPageWrapper>
  );
};
