import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, ErrorMessage, FormikErrors, FormikTouched, FormikProps } from 'formik';
import * as Yup from 'yup';

import { history } from 'Routes/history';
import { Api } from 'Utils/Api';
import { Heading3 } from 'Shared/Typography';
import { TextInput, TextInputErrorMessage } from 'Shared/Elements/TextInput';
import { Form } from 'Shared/Elements/Form';
import { ButtonFilled, IconButton } from 'Shared/Elements/Buttons';
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

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { t } = useTranslation();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, t('login.validation.username.minLength'))
      .max(30, t('login.validation.username.maxLength'))
      .required(t('login.validation.username.required')),
    firstName: Yup.string()
      .max(30, t('signup.validation.firstName.maxLength'))
      .required(t('signup.validation.firstName.required')),
    lastName: Yup.string()
      .max(30, t('signup.validation.lastName.maxLength'))
      .required(t('signup.validation.lastName.required')),
    email: Yup.string()
      .email(t('signup.validation.email.isValidEmail'))
      .required(t('signup.validation.email.required')),
    password: Yup.string()
      .min(8, t('login.validation.password.minLength'))
      .max(30, t('login.validation.password.maxLength'))
      .required(t('login.validation.password.required')),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signup.validation.rePassword.mustMatch'))
      .min(8, t('signup.validation.rePassword.minLength'))
      .max(30, t('signup.validation.rePassword.maxLength'))
      .required(t('signup.validation.rePassword.required'))
  });

  const handleSignup = async (values: SignupData) => {
    startLoading();
    const result = await Api.post('auth/signup', { ...values });

    stopLoading();
    if (result.status === 201) {
      history.push('/signup_success');
    }
  };

  const renderInput = (
    errors: FormikErrors<SignupData>,
    touched: FormikTouched<SignupData>,
    key: keyof SignupData
  ): JSX.Element => (
    <React.Fragment>
      <TextInput
        valid={!errors[key] && touched[key]}
        error={errors[key] && touched[key]}
        name={key}
        type={['password', 'rePassword'].includes(key) ? 'password' : 'text'}
        placeholder={t(`signup.${key}`)}
      />
      <ErrorMessage name={key}>
        {(msg: string) => <TextInputErrorMessage>{msg}</TextInputErrorMessage>}
      </ErrorMessage>
    </React.Fragment>
  );

  return (
    <LoginWrapper>
      <Container isLoading={isLoading} />
      <IconButton iconName="arrow_back" onClick={history.back} />
      <Heading3>{t('signup.title')}</Heading3>
      <Formik
        validateOnMount
        validationSchema={validationSchema}
        initialValues={initialData}
        onSubmit={handleSignup}
      >
        {({ errors, touched, handleSubmit, isValid }: FormikProps<SignupData>) => (
          <Form name="signup" method="POST" onSubmit={handleSubmit}>
            {renderInput(errors, touched, 'username')}
            {renderInput(errors, touched, 'firstName')}
            {renderInput(errors, touched, 'lastName')}
            {renderInput(errors, touched, 'email')}
            {renderInput(errors, touched, 'password')}
            {renderInput(errors, touched, 'rePassword')}
            <ButtonsContainer>
              <ButtonFilled disabled={!isValid} type="submit">
                {t('signup.submit')}
              </ButtonFilled>
            </ButtonsContainer>
          </Form>
        )}
      </Formik>
    </LoginWrapper>
  );
};
