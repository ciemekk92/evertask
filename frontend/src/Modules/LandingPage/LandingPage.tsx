import React from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { IconFilled } from 'Shared/Elements/Icons';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { StyledLink } from 'Shared/StyledLink';
import { Heading1, Heading3, Heading4 } from 'Shared/Typography';
import { ICON_SIZE } from 'Shared/constants';
import { landingFeatures } from './fixtures';
import {
  StyledButtonsContainer,
  StyledFeaturesContainer,
  StyledFeatureTile,
  StyledHeadlineContainer,
  StyledHeroContainer,
  StyledLandingContainer,
  StyledTilesContainer
} from './LandingPage.styled';

export const LandingPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <VerticalPageWrapper>
      <StyledLandingContainer>
        <StyledHeroContainer>
          <StyledHeadlineContainer>
            <Heading1>EverTask</Heading1>
            <Heading3>{t('landingPage.headline')}</Heading3>
          </StyledHeadlineContainer>
          <StyledButtonsContainer>
            <StyledLink to="/login">
              <ButtonFilled>{t('general.login')}</ButtonFilled>
            </StyledLink>
            <StyledLink to="/signup">
              <ButtonOutline>{t('general.signup')}</ButtonOutline>
            </StyledLink>
          </StyledButtonsContainer>
        </StyledHeroContainer>
        <StyledFeaturesContainer>
          <Heading4>{t('landingPage.features.title')}</Heading4>
          <StyledTilesContainer>
            {landingFeatures.map((feature, index) => (
              <StyledFeatureTile key={index}>
                <IconFilled
                  iconColor="#36459B"
                  iconSize={ICON_SIZE.XXL}
                  iconName={feature.iconName}
                />
                <p>{t(`landingPage.features.${feature.translationKey}`)}</p>
              </StyledFeatureTile>
            ))}
          </StyledTilesContainer>
        </StyledFeaturesContainer>
      </StyledLandingContainer>
    </VerticalPageWrapper>
  );
};
