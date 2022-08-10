import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Tabs } from 'Shared/Tabs';
import { Heading5 } from 'Shared/Typography';
import { SingleSelectDropdown } from 'Shared/Elements/SingleSelectDropdown';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from 'Stores/Project';
import { Sprint } from 'Types/Sprint';
import { BurndownChart, VelocityChart } from './components';

export const Statistics = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedSprint, setSelectedSprint] = React.useState<Id>('');
  const currentProject = CurrentProjectModel.currentProjectValue;
  const sprints: Sprint.SprintEntity[] = useSelector(
    (state: ApplicationState) => (state.project ? state.project.sprints : []),
    shallowEqual
  );

  const emptyDropdownOption = React.useMemo(
    (): DropdownOption => ({ label: t('statistics.selectSprint'), value: '' }),
    [t]
  );

  React.useEffect(() => {
    dispatch(actionCreators.getSprints(currentProject.id));
  }, [dispatch, currentProject.id]);

  const sprintDropdownOptions: DropdownOption[] = React.useMemo(
    () => [
      emptyDropdownOption,
      ...sprints.map((sprint: Sprint.SprintEntity) => ({
        label: `Sprint ${sprint.ordinal}`,
        value: sprint.id
      }))
    ],
    [emptyDropdownOption, sprints]
  );

  const handleSprintChange = (value: Id) => {
    setSelectedSprint(value);
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <StyledFlexContainer>
        <Heading5>{t('statistics.title')}</Heading5>
      </StyledFlexContainer>
      <SingleSelectDropdown
        options={sprintDropdownOptions}
        value={selectedSprint}
        onChange={handleSprintChange}
      />
      {Boolean(selectedSprint.length) && (
        <Tabs>
          <Tabs.Panel title={t('statistics.burndownChart')}>
            <BurndownChart sprintId={selectedSprint} />
          </Tabs.Panel>
          <Tabs.Panel title={t('statistics.velocityChart')}>
            <VelocityChart projectId={currentProject.id} />
          </Tabs.Panel>
        </Tabs>
      )}
    </VerticalPageWrapper>
  );
};
