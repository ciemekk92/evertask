import React from 'react';
import * as Yup from 'yup';
import { ErrorMessage, Formik, FormikErrors, FormikProps, FormikTouched } from 'formik';
import { useTranslation } from 'react-i18next';
import { Form } from 'Shared/Elements/Form';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { TextInput, TextInputErrorMessage } from 'Shared/Elements/TextInput';
import { ModalDialog } from 'Shared/ModalDialog';
import { Api } from 'Utils/Api';
import { StyledDialogContent } from '../MFADialog/MFADialog.styled';
import { StyledInputContainer } from './ChangePasswordDialog.styled';

interface Props {
  handleClose: VoidFunctionNoArgs;
}

interface ChangePasswordData {
  password: string;
  rePassword: string;
  newPassword: string;
}

export const ChangePasswordDialog = ({ handleClose }: Props): JSX.Element => {
  const { t } = useTranslation();

  const initialData: ChangePasswordData = {
    password: '',
    rePassword: '',
    newPassword: ''
  };

  const onCancel = React.useCallback(
    (e: React.MouseEvent): void => {
      e.preventDefault();
      handleClose();
    },
    [handleClose]
  );

  const renderFooter = (isSubmitDisabled: boolean): JSX.Element => (
    <React.Fragment>
      <ButtonFilled disabled={isSubmitDisabled} type="submit">
        {t('general.submit')}
      </ButtonFilled>
      <ButtonOutline onClick={onCancel}>{t('general.cancel')}</ButtonOutline>
    </React.Fragment>
  );

  const renderInput = (
    errors: FormikErrors<ChangePasswordData>,
    touched: FormikTouched<ChangePasswordData>,
    key: keyof ChangePasswordData
  ): JSX.Element => (
    <React.Fragment>
      <TextInput
        valid={!errors[key] && touched[key]}
        error={errors[key] && touched[key]}
        name={key}
        type="password"
        placeholder={t(`general.${key}`)}
      />
      <ErrorMessage name={key}>
        {(msg: string) => <TextInputErrorMessage>{msg}</TextInputErrorMessage>}
      </ErrorMessage>
    </React.Fragment>
  );

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, t('login.validation.password.minLength'))
      .max(30, t('login.validation.password.maxLength'))
      .required(t('login.validation.password.required')),
    rePassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('signup.validation.rePassword.mustMatch'))
      .min(8, t('signup.validation.rePassword.minLength'))
      .max(30, t('signup.validation.rePassword.maxLength'))
      .required(t('signup.validation.rePassword.required')),
    newPassword: Yup.string()
      .min(8, t('changePasswordDialog.validation.newPassword.minLength'))
      .max(30, t('changePasswordDialog.validation.newPassword.maxLength'))
      .required(t('changePasswordDialog.validation.newPassword.required'))
  });

  const onSubmit = async (values: ChangePasswordData) => {
    const result = await Api.put('auth/change_password', values);

    if (result.status === 204) {
      handleClose();
    }
  };

  return (
    <Formik
      validationSchema={validationSchema}
      validateOnMount
      initialValues={initialData}
      onSubmit={onSubmit}
    >
      {({ errors, touched, handleSubmit, isValid }: FormikProps<ChangePasswordData>) => (
        <Form name="changePassword" method="POST" onSubmit={handleSubmit}>
          <ModalDialog header={t('changePasswordDialog.header')} footer={renderFooter(!isValid)}>
            <StyledDialogContent>
              <StyledInputContainer>
                {renderInput(errors, touched, 'password')}
                {renderInput(errors, touched, 'rePassword')}
                {renderInput(errors, touched, 'newPassword')}
              </StyledInputContainer>
            </StyledDialogContent>
          </ModalDialog>
        </Form>
      )}
    </Formik>
  );
};
