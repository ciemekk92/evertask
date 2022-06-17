import React from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingModalDialog } from 'Shared/LoadingModalDialog';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { useLoading } from 'Hooks/useLoading';
import { StyledDialogContent } from './ConfirmationDialog.styled';

interface Props {
  message: string;
  handleClose: VoidFunctionNoArgs;
  handleConfirm: VoidFunctionNoArgs;
}

export const ConfirmationDialog = ({ message, handleClose, handleConfirm }: Props): JSX.Element => {
  const { t } = useTranslation();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const onCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
  };

  const renderFooter = () => (
    <React.Fragment>
      <ButtonOutline onClick={onCancel}>{t('general.no')}</ButtonOutline>
      <ButtonFilled onClick={handleConfirm}>{t('general.yes')}</ButtonFilled>
    </React.Fragment>
  );

  return (
    <LoadingModalDialog
      isLoading={isLoading}
      header={t('confirmationDialog.header')}
      footer={renderFooter()}
    >
      <StyledDialogContent>{message}</StyledDialogContent>
    </LoadingModalDialog>
  );
};
