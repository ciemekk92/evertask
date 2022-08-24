import React from 'react';
import { useTranslation } from 'react-i18next';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { IconButton } from 'Shared/Elements/Buttons';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { ProgressBar } from 'Shared/ProgressBar';
import { Heading6 } from 'Shared/Typography';
import { convertHoursToDayHours } from 'Utils/convertHoursToDayHours';
import { TimeTrackingData } from '../../fixtures';
import { ReportTimeDialog } from './components';
import { REPORT_TIME_DIALOG_MODES, TIME_TRACKING_COLORS } from './fixtures';
import { StyledFieldContainer, StyledTextContainer } from './IssueTimeTrackingSection.styled';

interface Props {
  issueId: Id;
  timeTrackingData: TimeTrackingData;
  refreshTimeTrackingData: VoidFunctionNoArgs;
}

export const IssueTimeTrackingSection = ({
  issueId,
  timeTrackingData,
  refreshTimeTrackingData
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const reportTimeDialogConfig = useDialog<REPORT_TIME_DIALOG_MODES>(REPORT_TIME_DIALOG_MODES.ADD);

  const handleOpeningReportTime = async (): Promise<void> => {
    const result = await reportTimeDialogConfig.handleOpen(REPORT_TIME_DIALOG_MODES.ADD, {
      issueId
    });

    if (result) {
      refreshTimeTrackingData();
    }
  };

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
        <IconButton onClick={handleOpeningReportTime} iconName="timer">
          {t('issuePage.timeTracking.report')}
        </IconButton>
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
      <DialogComponent
        isOpen={reportTimeDialogConfig.isOpen}
        handleClose={reportTimeDialogConfig.handleClose}
      >
        <ReportTimeDialog
          issueId={reportTimeDialogConfig.params.issueId}
          handleClose={reportTimeDialogConfig.handleClose}
          handleSubmitting={reportTimeDialogConfig.handleSubmit}
        />
      </DialogComponent>
    </StyledSectionWrapper>
  );
};
