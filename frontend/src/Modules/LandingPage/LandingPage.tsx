import React from 'react';
import { ButtonFilled } from 'Shared/Elements/Buttons/ButtonFilled';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { StyledLink } from 'Shared/StyledLink';
import { ButtonsContainer, LandingContainer } from './LandingPage.styled';

export const LandingPage = (): JSX.Element => {
  return (
    <VerticalPageWrapper>
      <LandingContainer>
        <p>Tekst testowy</p>
        <ButtonsContainer>
          <StyledLink to={'/login'}>
            <ButtonFilled>Zaloguj</ButtonFilled>
          </StyledLink>
          <StyledLink to={'/signup'}>
            <ButtonFilled onClick={() => null}>Zarejestruj (nie działa)</ButtonFilled>
          </StyledLink>
        </ButtonsContainer>
      </LandingContainer>
    </VerticalPageWrapper>
  );
};
