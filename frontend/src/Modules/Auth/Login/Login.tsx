import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Heading3 } from 'Shared/Typography';
import { TextInput } from 'Shared/Elements/TextInput';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { StyledLink } from 'Shared/StyledLink';
import { ApplicationState } from 'Stores/store';
import { actionCreators, LoginCredentials } from 'Stores/User';
import { updateObject } from 'Utils/updateObject';
import { Container } from 'Hooks/useLoading';
import { ButtonsContainer, LoginWrapper } from './Login.styled';

export const Login = (): JSX.Element => {
  const initialData: LoginCredentials = {
    email: '',
    password: ''
  };

  const { t } = useTranslation();

  const isLoading = useSelector(
    (state: ApplicationState) => (state.user ? state.user.isLoading : false),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [data, setData] = React.useState<LoginCredentials>(initialData);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setData(updateObject(data, { [target.name]: target.value }));
  };

  const handleLogin = async () => {
    await dispatch(actionCreators.loginUser(data));
  };

  return (
    <React.Fragment>
      <Container isLoading={isLoading} />
      <LoginWrapper>
        <Heading3>{t('login.title')}</Heading3>
        <TextInput name="email" placeholder={t('general.email')} onChange={onChange} />
        <TextInput
          type="password"
          name="password"
          placeholder={t('general.password')}
          onChange={onChange}
        />
        <ButtonsContainer>
          <ButtonFilled onClick={handleLogin}>{t('general.login')}</ButtonFilled>
          <ButtonOutline>
            <StyledLink replace to="/signup">
              {t('general.signup')}
            </StyledLink>
          </ButtonOutline>
          <ButtonOutline>
            <StyledLink replace to="/reset-password">
              {t('general.resetPassword')}
            </StyledLink>
          </ButtonOutline>
        </ButtonsContainer>
      </LoginWrapper>
    </React.Fragment>
  );
};
