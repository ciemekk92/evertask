import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LabelBadge } from 'Shared/LabelBadge';
import { DROPDOWN_MENU_POSITION, DropdownMenu } from 'Shared/Elements/DropdownMenu';
import { formatDateForDisplay } from 'Utils/formatDate';
import { Sprint } from 'Types/Sprint';
import { START_END_SPRINT_DIALOG_MODES } from 'Modules/StartEndSprintDialog';
import { StyledDateLabel, StyledSprintPanel } from './SprintPanel.styled';

interface Props {
  sprint: Sprint.SprintEntity;
  isActive: boolean;
  canBeStarted: boolean;
  handleOpeningEditSprint: (id: Id) => VoidFunctionNoArgs;
  handleOpeningStartEndSprintDialog: (mode: START_END_SPRINT_DIALOG_MODES) => Promise<void>;
}

export const SprintPanel = ({
  sprint,
  isActive,
  canBeStarted,
  handleOpeningEditSprint,
  handleOpeningStartEndSprintDialog
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

  const getDropdownOptions = (): Util.MenuOptionWithOnClick[] => {
    let dropdownOptions = [
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

    if (isActive) {
      dropdownOptions.push({
        label: t('general.endSprint'),
        onClick: () => handleOpeningStartEndSprintDialog(START_END_SPRINT_DIALOG_MODES.END),
        iconName: 'check_small'
      });
    }

    if (canBeStarted) {
      dropdownOptions.push({
        label: t('general.startSprint'),
        onClick: () => handleOpeningStartEndSprintDialog(START_END_SPRINT_DIALOG_MODES.START),
        iconName: 'start'
      });
    }

    return dropdownOptions;
  };

  return (
    <StyledSprintPanel>
      <p>{`Sprint ${sprint.ordinal}`}</p>
      {isActive && <LabelBadge label={t('general.active')} />}
      {renderUpdatedAtDate(sprint.updatedAt)}
      <DropdownMenu options={getDropdownOptions()} position={DROPDOWN_MENU_POSITION.BOTTOM_LEFT} />
    </StyledSprintPanel>
  );
};
