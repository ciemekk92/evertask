import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LabelBadge } from 'Shared/LabelBadge';
import { DropdownMenu } from 'Shared/Elements/DropdownMenu';
import { formatDateForDisplay } from 'Utils/formatDate';
import { Sprint } from 'Types/Sprint';
import { StyledDateLabel, StyledSprintPanel } from './ProjectSprintPanel.styled';

interface Props {
  sprint: Sprint.SprintEntity;
  isActive: boolean;
  handleOpeningEditSprint: (id: Id) => VoidFunctionNoArgs;
}

export const ProjectSprintPanel = ({
  sprint,
  isActive,
  handleOpeningEditSprint
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const renderUpdatedAtDate = (updatedAt: Nullable<string>): JSX.Element => {
    if (updatedAt) {
      return (
        <StyledDateLabel>
          {t('general.updatedAt')}: {formatDateForDisplay(new Date(updatedAt))}
        </StyledDateLabel>
      );
    }

    return <StyledDateLabel>{t('general.notUpdated')}</StyledDateLabel>;
  };

  const dropdownOptions = [
    {
      label: t('general.view'),
      onClick: () => navigate(`/sprint/${sprint.id}`),
      iconName: 'visibility'
    },
    {
      label: t('general.edit'),
      onClick: handleOpeningEditSprint(sprint.id),
      iconName: 'edit'
    }
  ];

  return (
    <StyledSprintPanel>
      <p>{`Sprint ${sprint.ordinal}`}</p>
      {isActive && <LabelBadge label={t('general.active')} />}
      {renderUpdatedAtDate(sprint.updatedAt)}
      <DropdownMenu options={dropdownOptions} />
    </StyledSprintPanel>
  );
};
