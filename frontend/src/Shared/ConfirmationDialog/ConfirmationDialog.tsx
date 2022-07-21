import React from 'react';
import { useTranslation } from 'react-i18next';
import { ModalDialog } from 'Shared/ModalDialog';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { StyledDialogContent } from './ConfirmationDialog.styled';

interface Props {
  message?: string;
  handleClose: VoidFunctionNoArgs;
  handleConfirm: VoidFunctionNoArgs | (() => Promise<boolean>);
}

export const ConfirmationDialog = ({ message, handleClose, handleConfirm }: Props): JSX.Element => {
  const { t } = useTranslation();

  const onCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
  };

  const onSubmit = async () => {
    await handleConfirm();
    handleClose();
  };

  const renderFooter = () => (
    <React.Fragment>
      <ButtonOutline onClick={onCancel}>{t('general.no')}</ButtonOutline>
      <ButtonFilled onClick={onSubmit}>{t('general.yes')}</ButtonFilled>
    </React.Fragment>
  );

  return (
    <ModalDialog header={t('confirmationDialog.header')} footer={renderFooter()}>
      {message && <StyledDialogContent>{message}</StyledDialogContent>}
    </ModalDialog>
  );
};
