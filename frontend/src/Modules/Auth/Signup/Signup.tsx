import React from 'react';
import { useTranslation } from 'react-i18next';

import { history } from 'Routes/history';
import { updateObject } from 'Utils/updateObject';
import { Api } from 'Utils/Api';
import { Heading3 } from 'Shared/Typography';
import { TextInput } from 'Shared/Elements/TextInput';
import { ButtonFilled, IconButton } from 'Shared/Elements/Buttons';
import { FormField } from 'Shared/Elements/Form';
import { EMAIL_PATTERN } from 'Shared/constants';
import { useLoading, Container } from 'Hooks/useLoading';
import { useValidation } from 'Hooks/useValidation';

import { ButtonsContainer, InputsContainer, LoginWrapper } from '../Login/Login.styled';

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
  const { errors, saveErrors, removeError } = useValidation();

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.has(target.name)) {
      removeError(target.name);
    }

    setData(updateObject(data, { [target.name]: target.value }));
  };

  const isFieldValid = (fieldKey: string): boolean => !errors.has(fieldKey);

  const handleSignup = async () => {
    startLoading();
    const result = await Api.post('auth/signup', { ...data });

    stopLoading();
    if (result.status === 201) {
      history.push('/signup_success');
    } else {
      const { messages }: { messages: string[] } = await result.json();

      saveErrors(messages);
    }
  };

  const isSignupButtonDisabled =
    data.password.length <= 2 ||
    data.password !== data.rePassword ||
    !EMAIL_PATTERN.test(data.email) ||
    Object.values(data).some((value: string) => value.length === 0);

  const renderTextInput = (key: string, isPassword?: boolean): JSX.Element => {
    if (isPassword) {
      return (
        <FormField isValid={isFieldValid(key)} validationMessage={errors.get(key)}>
          <TextInput
            name={key}
            autoComplete="off"
            type="password"
            placeholder={t(`signup.${key}`)}
            onChange={onChange}
          />
        </FormField>
      );
    }

    return (
      <FormField isValid={isFieldValid(key)} validationMessage={errors.get(key)}>
        <TextInput
          autoComplete="off"
          name={key}
          placeholder={t(`signup.${key}`)}
          onChange={onChange}
        />
      </FormField>
    );
  };

  return (
    <LoginWrapper>
      <Container isLoading={isLoading} />
      <IconButton iconName="arrow_back" onClick={history.back} />
      <Heading3>{t('signup.title')}</Heading3>
      <InputsContainer>
        {renderTextInput('username')}
        {renderTextInput('firstName')}
        {renderTextInput('lastName')}
        {renderTextInput('email')}
        {renderTextInput('password', true)}
        {renderTextInput('rePassword', true)}
      </InputsContainer>
      <ButtonsContainer>
        <ButtonFilled disabled={isSignupButtonDisabled} onClick={handleSignup}>
          {t('signup.submit')}
        </ButtonFilled>
      </ButtonsContainer>
    </LoginWrapper>
  );
};
