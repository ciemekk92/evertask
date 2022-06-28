import { ISSUE_TYPE } from 'Shared/constants';
import { capitalizeFirstLetter } from 'Utils/capitalizeFirstLetter';

export const mapIssueTypesToDropdownOptions = (): DropdownOption[] => {
  return Object.values(ISSUE_TYPE).map((type: string) => ({
    value: type,
    label: capitalizeFirstLetter(type)
  }));
};
