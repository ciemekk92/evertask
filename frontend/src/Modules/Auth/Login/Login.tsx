import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Formik,
  ErrorMessage,
  FormikErrors,
  FormikTouched,
  FormikProps
} from 'formik';
import * as Yup from 'yup';

import { Heading3, StyledValidationMessage } from 'Shared/Typography';
import { TextInput, TextInputErrorMessage } from 'Shared/Elements/TextInput';
import { Form } from 'Shared/Elements/Form';
import { ButtonFilled, ButtonLikeLink, ButtonOutline, IconButton } from 'Shared/Elements/Buttons';
import { StyledLink } from 'Shared/StyledLink';
import { ApplicationState } from 'Stores/store';
import { actionCreators, LoginCredentials } from 'Stores/User';
import { isDefined } from 'Utils/isDefined';
import { Container } from 'Hooks/useLoading';
import { useValidation } from 'Hooks/useValidation';
import { history } from 'Routes';
import { ButtonsContainer, LoginWrapper } from './Login.styled';

export const Login = (): JSX.Element => {
  const initialData: LoginCredentials = {
    username: '',
    password: ''
  };

  const { t } = useTranslation();
  const { validationErrors, saveErrors, removeError } = useValidation();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(6, t('login.validation.username.minLength'))
      .max(30, t('login.validation.username.maxLength'))
      .required(t('login.validation.username.required')),
    password: Yup.string()
      .min(8, t('login.validation.password.minLength'))
      .max(30, t('login.validation.password.maxLength'))
      .required(t('login.validation.password.required'))
  });

  const isLoading: boolean = useSelector(
    (state: ApplicationState) => (state.user ? state.user.isLoading : false),
    shallowEqual
  );

  const dispatch = useDispatch();

  const onSubmit = async (values: LoginCredentials) => {
    if (validationErrors.has('message')) {
      removeError('message');
    }

    const message = await dispatch(actionCreators.loginUser(values));

    if (isDefined(message) && typeof message !== 'function') {
      saveErrors(message);
    }
  };

  const renderInput = (
    errors: FormikErrors<LoginCredentials>,
    touched: FormikTouched<LoginCredentials>,
    key: keyof LoginCredentials
  ) => (
    <React.Fragment>
      <TextInput
        valid={!errors[key] && touched[key]}
        error={errors[key] && touched[key]}
        name={key}
        type={key === 'password' ? 'password' : 'text'}
        placeholder={t(`general.${key}`)}
      />
      <ErrorMessage name={key}>
        {(msg: string) => <TextInputErrorMessage>{msg}</TextInputErrorMessage>}
      </ErrorMessage>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Container isLoading={isLoading} />
      <LoginWrapper>
        <IconButton iconName="arrow_back" onClick={history.back} />
        <Heading3>{t('login.title')}</Heading3>
        <Formik
          validationSchema={validationSchema}
          validateOnMount
          initialValues={initialData}
          onSubmit={onSubmit}
        >
          {({ errors, touched, handleSubmit, isValid }: FormikProps<LoginCredentials>) => (
            <Form name="login" method="POST" onSubmit={handleSubmit}>
              {renderInput(errors, touched, 'username')}
              {renderInput(errors, touched, 'password')}
              <ButtonLikeLink>
                <StyledLink to="/reset-password">{t('general.resetPassword')}</StyledLink>
              </ButtonLikeLink>
              <StyledValidationMessage>{validationErrors.get('message')}</StyledValidationMessage>
              <ButtonsContainer>
                <ButtonFilled disabled={!isValid} type="submit">
                  {t('general.login')}
                </ButtonFilled>
                <ButtonOutline>
                  <StyledLink to="/signup">{t('general.signup')}</StyledLink>
                </ButtonOutline>
              </ButtonsContainer>
            </Form>
          )}
        </Formik>
      </LoginWrapper>
    </React.Fragment>
  );
};
