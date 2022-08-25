import { TFunction } from 'react-i18next';
import { ISSUE_PRIORITY, ISSUE_TYPE } from 'Shared/constants';
import { Sprint } from 'Types/Sprint';
import { capitalizeFirstLetter } from 'Utils/capitalizeFirstLetter';
import { ISSUE_DIALOG_MODES } from '../fixtures';

export const mapIssueTypesToDropdownOptions = (mode: ISSUE_DIALOG_MODES): DropdownOption[] => {
  return Object.values(ISSUE_TYPE).map((type: string) => ({
    value: type,
    label: capitalizeFirstLetter(type),
    disabled: mode === ISSUE_DIALOG_MODES.ADD && type === ISSUE_TYPE.SUBTASK
  }));
};

export const mapIssuePrioritiesToDropdownOptions = (
  t: TFunction<'translation'>
): DropdownOption[] => {
  return Object.values(ISSUE_PRIORITY).map((priority: string) => ({
    value: priority,
    label: t(`general.issuePriority.${priority}`)
  }));
};

export const mapSprintsToDropdownOptions = (
  sprints: Sprint.SprintIssuesEntity[]
): DropdownOption[] => {
  const noSprintSelectedOption = {
    value: null,
    label: `-`
  };

  const mappedSprints = sprints.map((sprint: Sprint.SprintIssuesEntity) => ({
    value: sprint.id,
    label: `Sprint ${sprint.ordinal}`
  }));

  return [noSprintSelectedOption, ...mappedSprints];
};
