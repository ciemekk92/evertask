import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { UserCircle } from 'Shared/UserCircle';
import { FileInput } from 'Shared/Elements/FileInput';
import { ErrorField } from 'Shared/Elements/ErrorField';
import { ButtonOutline } from 'Shared/Elements/Buttons';
import { UserModel } from 'Models/UserModel';
import { Api } from 'Utils/Api';
import {
  StyledAvatarDisclaimer,
  StyledAvatarSettingsContainer,
  StyledVerticalContainer
} from './AvatarSection.styled';

interface Props {
  onUpdate: VoidFunctionNoArgs;
}

export const AvatarSection = ({ onUpdate }: Props): JSX.Element => {
  const { t } = useTranslation();

  const [error, setError] = React.useState<Nullable<string>>();

  const currentUser = UserModel.currentUserValue;

  const handleAvatarUpload = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (target.files) {
      setError(null);

      const formData = new FormData();

      formData.append('imageFile', target.files[0]);

      const result = await Api.post('user/upload_avatar', formData);

      if (result.status === 200) {
        onUpdate();
      }

      if (result.status === 400) {
        const { message } = await result.json();

        setError(message);
      }
    }
  };

  const handleAvatarRemoval = async () => {
    const result = await Api.delete('user/remove_avatar');

    if (result.status === 204) {
      onUpdate();
    }
  };

  return (
    <StyledAvatarSettingsContainer>
      <Heading6>{t('profile.accountSettings.avatarHeading')}</Heading6>
      <StyledVerticalContainer>
        <UserCircle
          isBigImage
          label={t('profile.accountSettings.avatarLabel')}
          imageSrc={currentUser.avatar}
        />
        <FileInput
          onChange={handleAvatarUpload}
          label={t('profile.accountSettings.uploadAvatar')}
        />
        {error && <ErrorField error={error} />}
        {currentUser.avatar && (
          <ButtonOutline onClick={handleAvatarRemoval}>
            {t('profile.accountSettings.removeAvatar')}
          </ButtonOutline>
        )}
        <StyledAvatarDisclaimer>
          {t('profile.accountSettings.avatarDisclaimer')}
        </StyledAvatarDisclaimer>
      </StyledVerticalContainer>
    </StyledAvatarSettingsContainer>
  );
};
