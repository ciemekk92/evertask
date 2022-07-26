import React from 'react';
import { Formik, FormikProps, Form, FormikState } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { Heading6 } from 'Shared/Typography';
import { ButtonFilled, ButtonOutline, IconButton } from 'Shared/Elements/Buttons';
import { FormField } from 'Shared/Elements/Form';
import { TextInput } from 'Shared/Elements/TextInput';
import { TextArea } from 'Shared/Elements/TextArea';
import { StyledFlexContainerSpaceBetween } from 'Shared/SharedStyles.styled';
import { IUserModel, UserModel } from 'Models/UserModel';
import { Api } from 'Utils/Api';
import {
  StyledFooterContainer,
  StyledFormContainer,
  StyledHeaderContainer,
  StyledUserInfoSettingsContainer
} from './PersonalInfoSection.styled';

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  bio: Nullable<string>;
  phoneNumber: Nullable<string>;
}

interface Props {
  onUpdate: VoidFunctionNoArgs;
}

export const PersonalInfoSection = ({ onUpdate }: Props): JSX.Element => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .max(30, t('signup.validation.firstName.maxLength'))
      .required(t('signup.validation.firstName.required')),
    lastName: Yup.string()
      .max(30, t('signup.validation.lastName.maxLength'))
      .required(t('signup.validation.lastName.required')),
    email: Yup.string()
      .email(t('signup.validation.email.isValidEmail'))
      .required(t('signup.validation.email.required')),
    bio: Yup.string().max(1000, t('profile.validation.bio.maxLength')).nullable(),
    phoneNumber: Yup.string()
      .min(9, t('profile.validation.phoneNumber.minLength'))
      .max(30, t('profile.validation.phoneNumber.maxLength'))
      .nullable()
  });

  const [initialData, setInitialData] = React.useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    bio: null,
    phoneNumber: null
  });

  React.useEffect(() => {
    const subscription = UserModel.currentUser.subscribe((user: IUserModel) => {
      setInitialData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        bio: user.bio,
        phoneNumber: user.phoneNumber
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleEditingFactory =
    (resetForm?: (nextState?: Partial<FormikState<UserData>> | undefined) => void) => () => {
      if (isEditing) {
        const { currentUserValue } = UserModel;

        setInitialData({
          firstName: currentUserValue.firstName,
          lastName: currentUserValue.lastName,
          email: currentUserValue.email,
          bio: currentUserValue.bio,
          phoneNumber: currentUserValue.phoneNumber
        });
      }

      if (resetForm) {
        resetForm();
      }

      setIsEditing(!isEditing);
    };

  const renderFooter = (
    isSubmitButtonDisabled: boolean,
    resetForm?: VoidFunctionNoArgs
  ): Nullable<JSX.Element> => {
    if (!isEditing) {
      return null;
    }

    return (
      <StyledFooterContainer>
        <ButtonFilled disabled={isSubmitButtonDisabled} type="submit">
          {t('general.submit')}
        </ButtonFilled>
        <ButtonOutline onClick={toggleEditingFactory(resetForm)}>
          {t('general.cancel')}
        </ButtonOutline>
      </StyledFooterContainer>
    );
  };

  const handlePhoneNumberChangeFactory =
    (changeCb: (field: string, value: Unrestricted, shouldValidate?: boolean) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      if (e.target.validity.valid) {
        changeCb('phoneNumber', e.target.value);
      }
    };

  const onSubmit = async (values: UserData) => {
    const result = await Api.put(`user/${UserModel.currentUserValue.id}/update_details`, values);

    if (result.status === 204) {
      setIsEditing(false);
      onUpdate();
    }
  };

  return (
    <StyledUserInfoSettingsContainer>
      <Formik
        enableReinitialize
        validateOnMount
        validationSchema={validationSchema}
        initialValues={initialData}
        onSubmit={onSubmit}
      >
        {({
          errors,
          touched,
          handleSubmit,
          isValid,
          values,
          setFieldValue,
          resetForm
        }: FormikProps<UserData>) => (
          <React.Fragment>
            <StyledHeaderContainer>
              <Heading6>{t('profile.accountSettings.infoSectionHeading')}</Heading6>
              <IconButton onClick={toggleEditingFactory(resetForm)} iconName="edit" />
            </StyledHeaderContainer>
            <StyledFormContainer>
              <Form name="issue" method="POST" onSubmit={handleSubmit}>
                <StyledFlexContainerSpaceBetween>
                  <FormField label={t('general.firstName')} name="firstName">
                    <TextInput
                      valid={!errors.firstName && touched.firstName}
                      error={errors.firstName && touched.firstName}
                      name="firstName"
                      readonly={!isEditing}
                      value={values.firstName}
                    />
                  </FormField>
                  <FormField label={t('general.lastName')} name="lastName">
                    <TextInput
                      valid={!errors.lastName && touched.lastName}
                      error={errors.lastName && touched.lastName}
                      name="lastName"
                      readonly={!isEditing}
                      value={values.lastName}
                    />
                  </FormField>
                </StyledFlexContainerSpaceBetween>
                <StyledFlexContainerSpaceBetween>
                  <FormField label={t('general.email')} name="email">
                    <TextInput
                      valid={!errors.email && touched.email}
                      error={errors.email && touched.email}
                      name="email"
                      readonly={!isEditing}
                      value={values.email}
                    />
                  </FormField>
                  <FormField label={t('general.phoneNumber')} name="phoneNumber">
                    <TextInput
                      valid={!errors.phoneNumber && touched.phoneNumber}
                      error={errors.phoneNumber && touched.phoneNumber}
                      name="phoneNumber"
                      readonly={!isEditing}
                      pattern="\+?[0-9 ]{0,15}"
                      onChange={handlePhoneNumberChangeFactory(setFieldValue)}
                      value={values.phoneNumber ?? ''}
                    />
                  </FormField>
                </StyledFlexContainerSpaceBetween>
                <FormField label={t('general.bio')} name="bio">
                  <TextArea
                    name="bio"
                    valid={!errors.bio && touched.bio}
                    error={errors.bio && touched.bio}
                    readonly={!isEditing}
                    value={values.bio ?? ''}
                  ></TextArea>
                </FormField>
                {renderFooter(!isValid, resetForm)}
              </Form>
            </StyledFormContainer>
          </React.Fragment>
        )}
      </Formik>
    </StyledUserInfoSettingsContainer>
  );
};
