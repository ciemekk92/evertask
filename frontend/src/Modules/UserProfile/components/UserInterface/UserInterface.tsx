import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, FormikProps, FormikState } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { IUserModel, UserModel } from 'Models/UserModel';
import { ColorPicker } from 'Shared/ColorPicker';
import { FormikRadio } from 'Shared/Elements/RadioField/RadioField';
import { Form, FormField } from 'Shared/Elements/Form';
import { SingleSelectDropdown } from 'Shared/Elements/SingleSelectDropdown';
import { ButtonFilled, ButtonOutline, IconButton } from 'Shared/Elements/Buttons';
import { HorizontalPageWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { INTERFACE_LANGUAGE } from 'Shared/constants';
import { actionCreators } from 'Stores/User';
import { Api } from 'Utils/Api';
import {
  StyledButtonsContainer,
  StyledHeaderContainer,
  StyledInterfaceContainer
} from './UserInterface.styled';

interface UserInterfaceData {
  interfaceLanguage: INTERFACE_LANGUAGE;
  interfaceColor: string;
  darkMode: boolean;
}

export const UserInterface = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { userSettings } = UserModel.currentUserValue;

  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [initialData, setInitialData] = React.useState<UserInterfaceData>({
    interfaceLanguage: INTERFACE_LANGUAGE.EN,
    interfaceColor: '#3F51B5',
    darkMode: false
  });

  React.useEffect(() => {
    const subscription = UserModel.currentUser.subscribe(
      ({ userSettings: { interfaceLanguage, darkMode, interfaceColor } }: IUserModel) => {
        setInitialData({
          interfaceLanguage,
          interfaceColor,
          darkMode
        });
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const validationSchema = Yup.object().shape({
    interfaceLanguage: Yup.mixed().oneOf([INTERFACE_LANGUAGE.EN, INTERFACE_LANGUAGE.PL]),
    interfaceColor: Yup.string(),
    darkMode: Yup.boolean()
  });

  const languageDropdownOptions: DropdownOption[] = Object.values(INTERFACE_LANGUAGE).map(
    (value: INTERFACE_LANGUAGE) => ({
      value,
      label: t(`general.language.${value}`)
    })
  );

  const toggleEditingFactory =
    (resetForm?: (nextState?: Partial<FormikState<UserInterfaceData>>) => void) =>
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (isEditing) {
        setInitialData({
          interfaceLanguage: userSettings.interfaceLanguage,
          interfaceColor: userSettings.interfaceColor,
          darkMode: userSettings.darkMode
        });
      }

      if (resetForm) {
        resetForm();
      }

      setIsEditing(!isEditing);
    };

  const handleChangeFactory =
    <T extends {}>(
      field: string,
      changeCb: (field: string, value: T, shouldValidate?: boolean | undefined) => void
    ) =>
    (value: T) => {
      changeCb(field, value);
    };

  const onSubmit = async (values: UserInterfaceData) => {
    const result = await Api.put(`user/update_interface`, values);

    if (result.status === 204) {
      dispatch(actionCreators.getCurrentUserDetails());
    }
  };

  return (
    <HorizontalPageWrapper alignItems="unset" justifyContent="center">
      <StyledInterfaceContainer>
        <Formik
          enableReinitialize
          validateOnMount
          validationSchema={validationSchema}
          initialValues={initialData}
          onSubmit={onSubmit}
        >
          {({
            values,
            handleSubmit,
            isValid,
            setFieldValue,
            resetForm
          }: FormikProps<UserInterfaceData>) => (
            <Form name="userInterfaceSettings" method="POST" onSubmit={handleSubmit}>
              <StyledHeaderContainer>
                <Heading6>{t('profile.userInterface.title')}</Heading6>
                <IconButton onClick={toggleEditingFactory(resetForm)} iconName="edit" />
              </StyledHeaderContainer>
              <FormField
                label={t('profile.userInterface.interfaceLanguage')}
                name="interfaceLanguage"
              >
                <SingleSelectDropdown
                  options={languageDropdownOptions}
                  value={values.interfaceLanguage}
                  onChange={handleChangeFactory<INTERFACE_LANGUAGE>(
                    'interfaceLanguage',
                    setFieldValue
                  )}
                  disabled={!isEditing}
                />
              </FormField>
              <FormField label={t('profile.userInterface.darkMode.label')} name="darkMode">
                <FormikRadio
                  label={t('profile.userInterface.darkMode.lightMode')}
                  name="darkMode"
                  value={false}
                  handleClick={setFieldValue}
                  disabled={!isEditing}
                />
                <FormikRadio
                  label={t('profile.userInterface.darkMode.darkMode')}
                  name="darkMode"
                  value={true}
                  handleClick={setFieldValue}
                  disabled={!isEditing}
                />
              </FormField>
              <FormField
                alignItems="start"
                label={t('profile.userInterface.interfaceColor')}
                name="interfaceColor"
              >
                <ColorPicker
                  selectedColor={values.interfaceColor}
                  onSelectingColor={handleChangeFactory<string>('interfaceColor', setFieldValue)}
                  disabled={!isEditing}
                />
              </FormField>
              {isEditing && (
                <StyledButtonsContainer>
                  <ButtonFilled disabled={!isValid} type="submit">
                    {t('general.submit')}
                  </ButtonFilled>
                  <ButtonOutline onClick={toggleEditingFactory(resetForm)}>
                    {t('general.cancel')}
                  </ButtonOutline>
                </StyledButtonsContainer>
              )}
            </Form>
          )}
        </Formik>
      </StyledInterfaceContainer>
    </HorizontalPageWrapper>
  );
};
