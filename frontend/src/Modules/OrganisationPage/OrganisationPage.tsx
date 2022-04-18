import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { UserModel } from 'Models/UserModel';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { actionCreators } from 'Stores/User';
import { Organisation } from 'Types/Organisation';
import { ApplicationState } from 'Stores/store';
import {
  StyledHorizontalContainer,
  StyledInfoContent,
  StyledInfoField,
  StyledInfoLabel,
  StyledSectionContainer
} from './OrganisationPage.styled';

export const OrganisationPage = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(actionCreators.getOrganisation());
  }, []);

  const organisationData: Nullable<Organisation> = useSelector((state: ApplicationState) =>
    state.user ? state.user.organisation : null
  );

  const renderOrganisationInfo = (): Nullable<JSX.Element> => {
    if (organisationData) {
      return (
        <React.Fragment>
          <StyledInfoField>
            <StyledInfoLabel>{t('organisationPage.info.name')}</StyledInfoLabel>
            <StyledInfoContent>{organisationData.name}</StyledInfoContent>
          </StyledInfoField>
          <StyledInfoField>
            <StyledInfoLabel>{t('organisationPage.info.description')}</StyledInfoLabel>
            <StyledInfoContent>{organisationData.description}</StyledInfoContent>
          </StyledInfoField>
          <StyledInfoField>
            <StyledInfoLabel>{t('organisationPage.info.createdAt')}</StyledInfoLabel>
            <StyledInfoContent>
              {new Date(organisationData.createdAt).toLocaleString()}
            </StyledInfoContent>
          </StyledInfoField>
          {organisationData.updatedAt && (
            <StyledInfoField>
              <StyledInfoLabel>{t('organisationPage.info.updatedAt')}</StyledInfoLabel>
              <StyledInfoContent>
                {new Date(organisationData.updatedAt).toLocaleString()}
              </StyledInfoContent>
            </StyledInfoField>
          )}
        </React.Fragment>
      );
    }

    return null;
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <Heading5>{t('organisationPage.title')}</Heading5>
      <StyledHorizontalContainer>
        <StyledSectionContainer>{renderOrganisationInfo()}</StyledSectionContainer>
      </StyledHorizontalContainer>
    </VerticalPageWrapper>
  );
};
