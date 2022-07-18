import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ModalDialog } from 'Shared/ModalDialog';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { UserModel } from 'Models/UserModel';
import { actionCreators } from 'Stores/User';
import { Api } from 'Utils/Api';
import { StyledDialogContent, StyledMessageContainer, StyledQrWarning } from './MFADialog.styled';

interface Props {
  handleClose: VoidFunctionNoArgs;
}

interface MfaResponse {
  qrCodeImage: Nullable<string>;
  mfaEnabled: boolean;
}

export const MFADialog = ({ handleClose }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [qrCode, setQrCode] = React.useState<Nullable<string>>(null);

  const currentUser = UserModel.currentUserValue;

  const onCancel = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (qrCode) {
      setQrCode(null);
      dispatch(actionCreators.logout());
    }
    handleClose();
  };

  const onSubmit = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();

    const result = await Api.post('auth/update_mfa', { mfaEnabled: !currentUser.mfaEnabled });

    if (result.status === 200) {
      const { mfaEnabled, qrCodeImage } = (await result.json()) as MfaResponse;

      if (mfaEnabled) {
        setQrCode(qrCodeImage);
      }

      UserModel.currentUserSubject.next({
        ...currentUser,
        mfaEnabled
      });
    }
  };

  const renderContent = (): JSX.Element => {
    if (qrCode) {
      return (
        <StyledMessageContainer>
          <p>{t('mfaDialog.qrCode')}</p>
          <StyledQrWarning>{t('mfaDialog.qrWarning')}</StyledQrWarning>
          <img src={qrCode} alt="qr-code" />
        </StyledMessageContainer>
      );
    } else if (currentUser.mfaEnabled) {
      return (
        <StyledMessageContainer>
          <p>{t('mfaDialog.mfaEnabled')}</p>
          <ButtonFilled onClick={onSubmit}>{t('general.disable')}</ButtonFilled>
        </StyledMessageContainer>
      );
    }

    return (
      <StyledMessageContainer>
        <p>{t('mfaDialog.mfaDisabled')}</p>
        <ButtonFilled disabled={!!qrCode} onClick={onSubmit}>
          {t('general.enable')}
        </ButtonFilled>
      </StyledMessageContainer>
    );
  };

  const renderFooter = (): JSX.Element => (
    <React.Fragment>
      <ButtonOutline onClick={onCancel}>{t('general.cancel')}</ButtonOutline>
    </React.Fragment>
  );

  return (
    <ModalDialog header={t('mfaDialog.header')} footer={renderFooter()}>
      <StyledDialogContent>{renderContent()}</StyledDialogContent>
    </ModalDialog>
  );
};
