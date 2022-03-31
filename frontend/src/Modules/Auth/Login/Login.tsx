import React from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Heading3, StyledValidationMessage } from 'Shared/Typography';
import { TextInput } from 'Shared/Elements/TextInput';
import { ButtonFilled, ButtonLikeLink, ButtonOutline, IconButton } from 'Shared/Elements/Buttons';
import { StyledLink } from 'Shared/StyledLink';
import { ApplicationState } from 'Stores/store';
import { actionCreators, LoginCredentials } from 'Stores/User';
import { updateObject } from 'Utils/updateObject';
import { isDefined } from 'Utils/isDefined';
import { Container } from 'Hooks/useLoading';
import { useValidation } from 'Hooks/useValidation';
import { history } from 'Routes';
import { ButtonsContainer, InputsContainer, LoginWrapper } from './Login.styled';

export const Login = (): JSX.Element => {
  const initialData: LoginCredentials = {
    username: '',
    password: ''
  };

  const { t } = useTranslation();
  const { errors, saveErrors, removeError } = useValidation();

  const isLoading: boolean = useSelector(
    (state: ApplicationState) => (state.user ? state.user.isLoading : false),
    shallowEqual
  );

  const dispatch = useDispatch();

  const [data, setData] = React.useState<LoginCredentials>(initialData);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.has('message')) {
      removeError('message');
    }

    setData(updateObject(data, { [target.name]: target.value }));
  };

  const handleLogin = async () => {
    const message = await dispatch(actionCreators.loginUser(data));

    if (isDefined(message) && typeof message !== 'function') {
      saveErrors(message);
    }
  };

  return (
    <React.Fragment>
      <Container isLoading={isLoading} />
      <LoginWrapper>
        <IconButton iconName="arrow_back" onClick={history.back} />
        <Heading3>{t('login.title')}</Heading3>
        <InputsContainer>
          <TextInput name="username" placeholder={t('general.username')} onChange={onChange} />
          <TextInput
            type="password"
            name="password"
            placeholder={t('general.password')}
            onChange={onChange}
          />
          <ButtonLikeLink>
            <StyledLink to="/reset-password">{t('general.resetPassword')}</StyledLink>
          </ButtonLikeLink>
          <StyledValidationMessage>{errors.get('message')}</StyledValidationMessage>
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
