import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Heading3 } from 'Shared/Typography';
import { TextInput } from 'Shared/Elements/TextInput';
import { ButtonFilled, ButtonLikeLink, ButtonOutline, IconButton } from 'Shared/Elements/Buttons';
import { StyledLink } from 'Shared/StyledLink';
import { ApplicationState } from 'Stores/store';
import { actionCreators, LoginCredentials } from 'Stores/User';
import { updateObject } from 'Utils/updateObject';
import { Container } from 'Hooks/useLoading';
import { ButtonsContainer, InputsContainer, LoginWrapper } from './Login.styled';
import { history } from '../../../Routes';

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
    dispatch(actionCreators.loginUser(data));
  };

  return (
    <React.Fragment>
      <Container isLoading={isLoading} />
      <LoginWrapper>
        <IconButton iconName="arrow_back" onClick={history.back} />
        <Heading3>{t('login.title')}</Heading3>
        <InputsContainer>
          <TextInput name="email" placeholder={t('general.email')} onChange={onChange} />
          <TextInput
            type="password"
            name="password"
            placeholder={t('general.password')}
            onChange={onChange}
          />
          <ButtonLikeLink>
            <StyledLink to="/reset-password">{t('general.resetPassword')}</StyledLink>
          </ButtonLikeLink>
        </InputsContainer>
        <ButtonsContainer>
          <ButtonFilled onClick={handleLogin}>{t('general.login')}</ButtonFilled>
          <ButtonOutline>
            <StyledLink to="/signup">{t('general.signup')}</StyledLink>
          </ButtonOutline>
        </ButtonsContainer>
      </LoginWrapper>
    </React.Fragment>
  );
};
