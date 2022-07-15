import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { Heading6 } from 'Shared/Typography';
import { ButtonFilled } from 'Shared/Elements/Buttons';
import { StyledHorizontalField, StyledSecurityContainer } from './UserSecurity.styled';
import { MFADialog } from './components';
import { MFA_DIALOG_MODES } from './fixtures';

export const UserSecurity = (): JSX.Element => {
  const { t } = useTranslation();

  const mfaDialogConfig = useDialog<MFA_DIALOG_MODES>(MFA_DIALOG_MODES.EDIT);

  const renderDialogs = (): JSX.Element => (
    <React.Fragment>
      <DialogComponent isOpen={mfaDialogConfig.isOpen} handleClose={mfaDialogConfig.handleClose}>
        <MFADialog handleClose={mfaDialogConfig.handleClose} />
      </DialogComponent>
    </React.Fragment>
  );

  const handleOpeningMFADialog = (): void => {
    mfaDialogConfig.handleOpen(MFA_DIALOG_MODES.EDIT);
  };

  return (
    <StyledSecurityContainer>
      <Heading6>{t('profile.security.title')}</Heading6>
      <StyledHorizontalField>
        <p>{t('profile.security.changePassword')}</p>
        <ButtonFilled>{t('general.change')}</ButtonFilled>
      </StyledHorizontalField>
      <StyledHorizontalField>
        <p>{t('profile.security.twoFactorAuth')}</p>
        <ButtonFilled onClick={handleOpeningMFADialog}>{t('general.change')}</ButtonFilled>
      </StyledHorizontalField>
      {renderDialogs()}
    </StyledSecurityContainer>
  );
};
