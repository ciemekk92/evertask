import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDialog, DialogComponent } from 'Hooks/useDialog';
import { StyledLink } from 'Shared/StyledLink';
import { LabelBadge } from 'Shared/LabelBadge';
import { IconButton } from 'Shared/Elements/Buttons';
import { formatDateForDisplay } from 'Utils/formatDate';
import {
  StyledButtonContainer,
  StyledDateLabel,
  StyledSprintPanel
} from './ProjectSprintPanel.styled';

interface Props {
  sprint: Sprint.SprintEntity;
  isActive: boolean;
  handleOpeningEditSprint: VoidFunctionNoArgs;
  handleOpeningActivationConfirmation: VoidFunctionNoArgs;
}

export const ProjectSprintPanel = ({
  sprint,
  isActive,
  handleOpeningEditSprint,
  handleOpeningActivationConfirmation
}: Props): JSX.Element => {
  const { t } = useTranslation();

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

  const renderButtons = () => {
    return (
      <StyledButtonContainer>
        {!isActive && (
          <IconButton
            onClick={handleOpeningActivationConfirmation}
            iconName="keyboard_double_arrow_left"
          >
            {t('general.setActive')}
          </IconButton>
        )}
        <StyledLink to={`/sprint/${sprint.id}`}>
          <IconButton iconName="visibility">{t('general.view')}</IconButton>
        </StyledLink>
        <IconButton onClick={handleOpeningEditSprint} iconName="edit">
          {t('general.edit')}
        </IconButton>
      </StyledButtonContainer>
    );
  };

  return (
    <StyledSprintPanel>
      <p>{`Sprint ${sprint.ordinal}`}</p>
      {isActive && <LabelBadge label={t('general.active')} />}
      {renderUpdatedAtDate(sprint.updatedAt)}
      {renderButtons()}
    </StyledSprintPanel>
  );
};
