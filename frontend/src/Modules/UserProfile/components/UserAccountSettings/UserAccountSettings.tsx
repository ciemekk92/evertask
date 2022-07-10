import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { HorizontalPageWrapper } from 'Shared/PageWrappers';
import { UserModel } from 'Models/UserModel';
import { UserCircle } from 'Shared/UserCircle';
import { ButtonOutline } from 'Shared/Elements/Buttons';
import { FileInput } from 'Shared/Elements/FileInput';
import { Heading6 } from 'Shared/Typography';
import { Api } from 'Utils/Api';
import { actionCreators } from 'Stores/User';
import {
  StyledAvatarSettingsContainer,
  StyledHorizontalContainer,
  StyledUserInfoSettingsContainer
} from './UserAccountSettings.styled';

export const UserAccountSettings = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentUser = UserModel.currentUserValue;

  const handleAvatarUpload = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      const formData = new FormData();

      formData.append('imageFile', target.files[0]);

      const result = await Api.post('user/upload_avatar', formData);

      if (result.status === 200) {
        dispatch(actionCreators.getCurrentUserDetails());
      }
    }
  };

  const handleAvatarRemoval = async () => {
    const result = await Api.delete('user/remove_avatar');

    if (result.status === 204) {
      dispatch(actionCreators.getCurrentUserDetails());
    }
  };

  return (
    <HorizontalPageWrapper justifyContent="space-between">
      <StyledAvatarSettingsContainer>
        <Heading6>{t('profile.accountSettings.avatarHeading')}</Heading6>
        <StyledHorizontalContainer>
          <UserCircle
            isBigImage
            label={t('profile.accountSettings.avatarLabel')}
            imageSrc={currentUser.avatar}
          />
          <FileInput
            onChange={handleAvatarUpload}
            label={t('profile.accountSettings.uploadAvatar')}
          />
          {currentUser.avatar && (
            <ButtonOutline onClick={handleAvatarRemoval}>
              {t('profile.accountSettings.removeAvatar')}
            </ButtonOutline>
          )}
        </StyledHorizontalContainer>
      </StyledAvatarSettingsContainer>
      <StyledUserInfoSettingsContainer>Info container</StyledUserInfoSettingsContainer>
    </HorizontalPageWrapper>
  );
};
