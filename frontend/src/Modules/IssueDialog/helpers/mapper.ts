import { ISSUE_PRIORITY, ISSUE_TYPE } from 'Shared/constants';
import { capitalizeFirstLetter } from 'Utils/capitalizeFirstLetter';
import { Sprint } from 'Types/Sprint';

export const mapIssueTypesToDropdownOptions = (): DropdownOption[] => {
  return Object.values(ISSUE_TYPE).map((type: string) => ({
    value: type,
    label: capitalizeFirstLetter(type)
  }));
};

export const mapIssuePrioritiesToDropdownOptions = (): DropdownOption[] => {
  return Object.values(ISSUE_PRIORITY).map((priority: string) => ({
    value: priority,
    label: capitalizeFirstLetter(priority.replaceAll('_', ' '))
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
