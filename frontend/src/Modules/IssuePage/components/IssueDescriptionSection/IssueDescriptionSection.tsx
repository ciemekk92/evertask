import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { StyledDescriptionContainer } from './IssueDescriptionSection.styled';

interface Props {
  description: string;
}

export const IssueDescriptionSection = ({ description }: Props): JSX.Element => {
  const { t } = useTranslation();

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('issuePage.description.title')}</Heading6>
      </StyledSectionHeaderRow>
      <StyledDescriptionContainer
        dangerouslySetInnerHTML={{ __html: description }}
      ></StyledDescriptionContainer>
    </StyledSectionWrapper>
  );
};
