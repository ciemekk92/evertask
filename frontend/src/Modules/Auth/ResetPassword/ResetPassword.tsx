import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { ButtonsContainer, LoginWrapper } from 'Modules/Auth/Login/Login.styled';
import { ButtonFilled, ButtonOutline, IconButton } from 'Shared/Elements/Buttons';
import { history } from 'Routes';
import { Form } from 'Shared/Elements/Form';
import { TextInput, TextInputErrorMessage } from 'Shared/Elements/TextInput';
import { StyledLink } from 'Shared/StyledLink';
import { Heading3 } from 'Shared/Typography';
import { actionCreators } from 'Stores/User';

interface ResetPasswordData {
  email: string;
}

export const ResetPassword = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const initialData: ResetPasswordData = {
    email: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('resetPassword.validation.email.isValidEmail'))
      .required(t('resetPassword.validation.email.required'))
  });

  const onSubmit = (values: ResetPasswordData): void => {
    dispatch(actionCreators.resetPassword(values.email));
  };

  return (
    <LoginWrapper>
      <IconButton iconName="arrow_back" onClick={history.back} />
      <Heading3>{t('resetPassword.title')}</Heading3>
      <Formik
        validationSchema={validationSchema}
        validateOnMount
        initialValues={initialData}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleSubmit, isValid }: FormikProps<ResetPasswordData>) => (
          <Form name="reset" method="POST" onSubmit={handleSubmit}>
            <TextInput
              valid={!errors.email && touched.email}
              error={errors.email && touched.email}
              name="email"
              type="email"
              placeholder={t(`general.email`)}
            />
            <ErrorMessage name="email">
              {(msg: string) => <TextInputErrorMessage>{msg}</TextInputErrorMessage>}
            </ErrorMessage>
            <ButtonsContainer>
              <ButtonFilled disabled={!isValid} type="submit">
                {t('resetPassword.title')}
              </ButtonFilled>
              <ButtonOutline>
                <StyledLink to="/login">{t('general.login')}</StyledLink>
              </ButtonOutline>
            </ButtonsContainer>
          </Form>
        )}
      </Formik>
    </LoginWrapper>
  );
};
