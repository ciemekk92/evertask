import React from 'react';
import { useTranslation } from 'react-i18next';

import { NOTIFICATION_TYPES } from 'Shared/constants';
import { Heading6 } from 'Shared/Typography';
import { ButtonFilled } from 'Shared/Elements/Buttons';
import { StyledLink } from 'Shared/StyledLink';
import { LoginWrapper, ButtonsContainer } from '../Login/Login.styled';

interface Props {
  type: NOTIFICATION_TYPES;
}

export const SuccessNotification = ({ type }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <LoginWrapper>
      <Heading6>{t(`signup.successNotification.${type}`)}</Heading6>
      <ButtonsContainer>
        <StyledLink to={'/'}>
          <ButtonFilled>{t('general.mainPage')}</ButtonFilled>
        </StyledLink>
      </ButtonsContainer>
    </LoginWrapper>
  );
};
