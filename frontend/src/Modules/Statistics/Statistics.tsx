import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Tabs } from 'Shared/Tabs';
import { Heading5 } from 'Shared/Typography';
import { PROJECT_METHODOLOGIES } from 'Shared/constants';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';
import { actionCreators } from 'Stores/Project';
import {
  AverageAgeChart,
  BurndownChart,
  CreatedVsResolvedChart,
  VelocityChart
} from './components';

export const Statistics = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentProject = CurrentProjectModel.currentProjectValue;

  React.useEffect(() => {
    dispatch(actionCreators.getSprints(currentProject.id));
  }, [dispatch, currentProject.id]);

  const isProjectAgile: boolean = currentProject.methodology === PROJECT_METHODOLOGIES.AGILE;

  return (
    <VerticalPageWrapper alignItems="unset">
      <StyledFlexContainer>
        <Heading5>{t('statistics.title')}</Heading5>
      </StyledFlexContainer>
      <Tabs>
        <Tabs.Panel title={t('statistics.averageAgeChart')}>
          <AverageAgeChart projectId={currentProject.id} />
        </Tabs.Panel>
        <Tabs.Panel title={t('statistics.createdVsResolvedChart')}>
          <CreatedVsResolvedChart projectId={currentProject.id} />
        </Tabs.Panel>
        {isProjectAgile && (
          <Tabs.Panel title={t('statistics.burndownChart')}>
            <BurndownChart />
          </Tabs.Panel>
        )}
        {isProjectAgile && (
          <Tabs.Panel title={t('statistics.velocityChart')}>
            <VelocityChart projectId={currentProject.id} />
          </Tabs.Panel>
        )}
      </Tabs>
    </VerticalPageWrapper>
  );
};
