import React from 'react';
import { useTranslation } from 'react-i18next';

import { history } from 'Routes/history';
import { updateObject } from 'Utils/updateObject';
import { Api } from 'Utils/Api';
import { Heading3 } from 'Shared/Typography';
import { TextInput } from 'Shared/Elements/TextInput';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { StyledLink } from 'Shared/StyledLink';
import { EMAIL_PATTERN } from 'Shared/constants';
import { useLoading, Container } from 'Hooks/useLoading';

import { ButtonsContainer, LoginWrapper } from '../Login/Login.styled';

interface SignupData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rePassword: string;
}

export const Signup = (): JSX.Element => {
  const initialData: SignupData = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    rePassword: ''
  };

  const [data, setData] = React.useState<SignupData>(initialData);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { t } = useTranslation();

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setData(updateObject(data, { [target.name]: target.value }));
  };

  const handleSignup = async () => {
    startLoading();
    const result = await Api.post('auth/register', { email: data.email, password: data.password });

    stopLoading();
    if (result.status === 201) {
      history.push('/signup-success');
    } else {
      console.log(await result.json());
    }
  };

  const isSignupButtonDisabled =
    data.password.length <= 2 ||
    data.password !== data.rePassword ||
    !EMAIL_PATTERN.test(data.email);

  const renderTextInput = (key: string, isPassword?: boolean): JSX.Element => {
    if (isPassword) {
      return (
        <TextInput
          name={key}
          type="password"
          placeholder={t(`signup.${key}`)}
          onChange={onChange}
        />
      );
    }

    return <TextInput name={key} placeholder={t(`signup.${key}`)} onChange={onChange} />;
  };

  return (
    <LoginWrapper>
      <Container isLoading={isLoading} />
      <Heading3>{t('signup.title')}</Heading3>
      {renderTextInput('username')}
      {renderTextInput('firstName')}
      {renderTextInput('lastName')}
      {renderTextInput('email')}
      {renderTextInput('password', true)}
      {renderTextInput('rePassword', true)}
      <ButtonsContainer>
        <ButtonFilled disabled={isSignupButtonDisabled} onClick={handleSignup}>
          {t('signup.submit')}
        </ButtonFilled>
        <ButtonOutline>
          <StyledLink replace to={'/'}>
            {t('general.back')}
          </StyledLink>
        </ButtonOutline>
      </ButtonsContainer>
    </LoginWrapper>
  );
};
