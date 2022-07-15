import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { Heading6 } from 'Shared/Typography';
import { ButtonFilled } from 'Shared/Elements/Buttons';
import { StyledHorizontalField, StyledSecurityContainer } from './UserSecurity.styled';
import { ChangePasswordDialog, MFADialog } from './components';
import { CHANGE_PASSWORD_DIALOG_MODES, MFA_DIALOG_MODES } from './fixtures';

export const UserSecurity = (): JSX.Element => {
  const { t } = useTranslation();

  const mfaDialogConfig = useDialog<MFA_DIALOG_MODES>(MFA_DIALOG_MODES.EDIT);
  const changePasswordDialogConfig = useDialog<CHANGE_PASSWORD_DIALOG_MODES>(
    CHANGE_PASSWORD_DIALOG_MODES.EDIT
  );

  const renderDialogs = (): JSX.Element => (
    <React.Fragment>
      <DialogComponent isOpen={mfaDialogConfig.isOpen} handleClose={mfaDialogConfig.handleClose}>
        <MFADialog handleClose={mfaDialogConfig.handleClose} />
      </DialogComponent>
      <DialogComponent
        isOpen={changePasswordDialogConfig.isOpen}
        handleClose={changePasswordDialogConfig.handleClose}
      >
        <ChangePasswordDialog handleClose={changePasswordDialogConfig.handleClose} />
      </DialogComponent>
    </React.Fragment>
  );

  const handleOpeningMFADialog = (): void => {
    mfaDialogConfig.handleOpen(MFA_DIALOG_MODES.EDIT);
  };

  const handleOpeningChangePasswordDialog = (): void => {
    changePasswordDialogConfig.handleOpen(CHANGE_PASSWORD_DIALOG_MODES.EDIT);
  };

  return (
    <StyledSecurityContainer>
      <Heading6>{t('profile.security.title')}</Heading6>
      <StyledHorizontalField>
        <p>{t('profile.security.changePassword')}</p>
        <ButtonFilled onClick={handleOpeningChangePasswordDialog}>
          {t('general.change')}
        </ButtonFilled>
      </StyledHorizontalField>
      <StyledHorizontalField>
        <p>{t('profile.security.twoFactorAuth')}</p>
        <ButtonFilled onClick={handleOpeningMFADialog}>{t('general.change')}</ButtonFilled>
      </StyledHorizontalField>
      {renderDialogs()}
    </StyledSecurityContainer>
  );
};
