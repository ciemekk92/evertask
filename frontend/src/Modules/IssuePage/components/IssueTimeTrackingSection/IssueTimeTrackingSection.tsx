import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { ProgressBar } from 'Shared/ProgressBar';
import { Heading6 } from 'Shared/Typography';
import { convertHoursToDayHours } from 'Utils/convertHoursToDayHours';
import { TimeTrackingData } from '../../fixtures';
import { TIME_TRACKING_COLORS } from './fixtures';
import { StyledFieldContainer, StyledTextContainer } from './IssueTimeTrackingSection.styled';

interface Props {
  timeTrackingData: TimeTrackingData;
}

export const IssueTimeTrackingSection = ({ timeTrackingData }: Props): JSX.Element => {
  const { t } = useTranslation();

  const reportedPercentage = React.useMemo(() => {
    if (timeTrackingData.estimatedHours) {
      return Math.round(
        (timeTrackingData.totalReportedHours / timeTrackingData.estimatedHours) * 100
      );
    }

    return 0;
  }, [timeTrackingData]);
  const remainingPercentage = React.useMemo(() => 100 - reportedPercentage, [reportedPercentage]);

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('issuePage.timeTracking.title')}</Heading6>
      </StyledSectionHeaderRow>
      {timeTrackingData.estimatedHours && (
        <StyledFieldContainer>
          <StyledTextContainer>
            <p>{t('issuePage.timeTracking.estimatedHours')}</p>
            <strong>{convertHoursToDayHours(timeTrackingData.estimatedHours)}</strong>
          </StyledTextContainer>
          <ProgressBar barColor={TIME_TRACKING_COLORS.ESTIMATED} />
        </StyledFieldContainer>
      )}
      <StyledFieldContainer>
        <StyledTextContainer>
          <p>{t('issuePage.timeTracking.totalReportedHours')}</p>
          <strong>{convertHoursToDayHours(timeTrackingData.totalReportedHours)}</strong>
        </StyledTextContainer>
        <ProgressBar percentage={reportedPercentage} barColor={TIME_TRACKING_COLORS.REPORTED} />
      </StyledFieldContainer>
      {timeTrackingData.estimatedHours && (
        <StyledFieldContainer>
          <StyledTextContainer>
            <p>{t('issuePage.timeTracking.remainingHours')}</p>
            <strong>{convertHoursToDayHours(timeTrackingData.remainingHours)}</strong>
          </StyledTextContainer>
          <ProgressBar
            isInverted
            percentage={remainingPercentage}
            barColor={TIME_TRACKING_COLORS.REMAINING}
          />
        </StyledFieldContainer>
      )}
    </StyledSectionWrapper>
  );
};
