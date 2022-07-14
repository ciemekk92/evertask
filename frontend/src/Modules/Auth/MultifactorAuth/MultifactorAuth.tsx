import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Formik, ErrorMessage, FormikProps } from 'formik';
import * as Yup from 'yup';
import { Form } from 'Shared/Elements/Form';
import { ButtonFilled, IconButton } from 'Shared/Elements/Buttons';
import { TextInput, TextInputErrorMessage } from 'Shared/Elements/TextInput';
import { Heading3, StyledValidationMessage } from 'Shared/Typography';
import { Container } from 'Hooks/useLoading';
import { useValidation } from 'Hooks/useValidation';
import { IUserModel, UserModel } from 'Models/UserModel';
import { history } from 'Routes';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from 'Stores/User';
import { isDefined } from 'Utils/isDefined';
import { ButtonsContainer, LoginWrapper } from '../Login/Login.styled';

interface MFAData {
  code: string;
}

export const MultifactorAuth = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { validationErrors, saveErrors, removeError } = useValidation();
  const currentUser = UserModel.currentUserValue;

  const initialData: MFAData = {
    code: ''
  };

  const isLoading: boolean = useSelector(
    (state: ApplicationState) => (state.user ? state.user.isLoading : false),
    shallowEqual
  );

  React.useEffect(() => {
    const subscription = UserModel.currentUser.subscribe((user: IUserModel) => {
      if (!user.accessToken) {
        history.push('/');
      }

      return () => subscription.unsubscribe();
    });
  }, []);

  const onSubmit = async (values: MFAData) => {
    if (validationErrors.has('message')) {
      removeError('message');
    }

    const message = await dispatch(actionCreators.verifyMfa(values.code));

    if (isDefined(message) && typeof message !== 'function') {
      saveErrors(message);
    }
  };

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .min(6, t('mfa.validation.code.minLength'))
      .max(6, t('mfa.validation.code.maxLength'))
      .required(t('mfa.validation.code.required'))
  });

  const handleReturning = () => {
    if (currentUser.accessToken) {
      dispatch(actionCreators.logout());
    } else {
      history.back();
    }
  };

  const handleCodeChangeFactory =
    (changeCb: (field: string, value: Unrestricted, shouldValidate?: boolean) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if (e.target.validity.valid) {
        changeCb('code', e.target.value);
      }
    };

  return (
    <LoginWrapper>
      <Container isLoading={isLoading} />
      <IconButton iconName="arrow_back" onClick={handleReturning} />
      <Heading3>{t('mfa.title')}</Heading3>
      <Formik
        validationSchema={validationSchema}
        validateOnMount
        initialValues={initialData}
        onSubmit={onSubmit}
      >
        {({ errors, touched, handleSubmit, isValid, setFieldValue }: FormikProps<MFAData>) => (
          <Form name="login" method="POST" onSubmit={handleSubmit}>
            <TextInput
              valid={!errors.code && touched.code}
              error={errors.code && touched.code}
              name="code"
              type="text"
              pattern="[0-9]*"
              onChange={handleCodeChangeFactory(setFieldValue)}
              placeholder={t('general.code')}
            />
            <ErrorMessage name="code">
              {(msg: string) => <TextInputErrorMessage>{msg}</TextInputErrorMessage>}
            </ErrorMessage>
            <StyledValidationMessage>{validationErrors.get('message')}</StyledValidationMessage>
            <ButtonsContainer>
              <ButtonFilled disabled={!isValid} type="submit">
                {t('general.submit')}
              </ButtonFilled>
            </ButtonsContainer>
          </Form>
        )}
      </Formik>
    </LoginWrapper>
  );
};
