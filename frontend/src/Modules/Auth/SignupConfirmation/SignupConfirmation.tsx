import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading3, Heading6 } from 'Shared/Typography';
import { ButtonOutline } from 'Shared/Elements/Buttons';
import { StyledLink } from 'Shared/StyledLink';
import { Api } from 'Utils/Api';
import { LoginWrapper, ButtonsContainer } from '../Login/Login.styled';

export const SignupConfirmation = (): Nullable<JSX.Element> => {
  const [error, setError] = React.useState<string>('');
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const { t } = useTranslation();

  React.useEffect(() => {
    const activateUser = async (activationToken: string) => {
      return Api.put(`auth/confirm_signup?token=${activationToken}`);
    };

    const token = searchParams.get('token');

    if (token) {
      activateUser(token).then(async (response: Response) => {
        if ([400, 404, 405, 500].includes(response.status)) {
          const { message } = await response.json();
          setError(message);
        } else {
          setIsSuccess(true);
        }
      });
    }
  }, [searchParams]);

  if (error.length) {
    return (
      <LoginWrapper>
        <Heading6>{error}</Heading6>
        <ButtonsContainer>
          <StyledLink to={'/'}>
            <ButtonOutline>{t('general.mainPage')}</ButtonOutline>
          </StyledLink>
        </ButtonsContainer>
      </LoginWrapper>
    );
  }

  if (isSuccess) {
    return (
      <LoginWrapper>
        <Heading3>{t('signupConfirmation.title')}</Heading3>
        <Heading6>{t('signupConfirmation.success')}</Heading6>
        <ButtonsContainer>
          <StyledLink to={'/'}>
            <ButtonOutline>{t('signupConfirmation.start')}</ButtonOutline>
          </StyledLink>
        </ButtonsContainer>
      </LoginWrapper>
    );
  }

  return null;
};
