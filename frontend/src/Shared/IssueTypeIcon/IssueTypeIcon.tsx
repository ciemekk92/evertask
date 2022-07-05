import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconFilled } from 'Shared/Elements/Icons';
import { ISSUE_TYPE } from '../constants';

interface Props {
  type: ISSUE_TYPE;
}

export const IssueTypeIcon = ({ type }: Props): JSX.Element => {
  const { t } = useTranslation();

  const iconName: string = React.useMemo(
    () =>
      ({
        [ISSUE_TYPE.BUG]: 'bug_report',
        [ISSUE_TYPE.EPIC]: 'account_tree',
        [ISSUE_TYPE.STORY]: 'add_box',
        [ISSUE_TYPE.TASK]: 'task',
        [ISSUE_TYPE.SUBTASK]: 'view_kanban'
      }[type]),
    [type]
  );

  const iconColor: string = React.useMemo(
    () =>
      ({
        [ISSUE_TYPE.BUG]: '#D33636',
        [ISSUE_TYPE.EPIC]: '#692AF5',
        [ISSUE_TYPE.STORY]: '#68AD48',
        [ISSUE_TYPE.TASK]: '#4267E3',
        [ISSUE_TYPE.SUBTASK]: '#3bA5EE'
      }[type]),
    [type]
  );

  return (
    <IconFilled title={t(`general.issueType.${type}`)} iconName={iconName} iconColor={iconColor} />
  );
};
