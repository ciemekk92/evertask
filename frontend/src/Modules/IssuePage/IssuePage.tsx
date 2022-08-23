import React from 'react';
import { useParams } from 'react-router';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { StyledHorizontalContainer, VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';
import { ISSUE_TYPE } from 'Shared/constants';
import { Issue } from 'Types/Issue';
import { ApiResponse } from 'Types/Response';
import { Api } from 'Utils/Api';
import {
  IssueCenterInfoSection,
  IssueCommentsSection,
  IssueDescriptionSection,
  IssueRightInfoSection,
  IssueSubtasksSection,
  IssueTimeTrackingSection
} from './components';
import { CommentsData, TimeTrackingData } from './fixtures';
import { ISSUE_DIALOG_MODES, IssueDialog } from '../IssueDialog';
import { StyledCenterSectionContainer, StyledRightSectionContainer } from './IssuePage.styled';

export const IssuePage = (): Nullable<JSX.Element> => {
  const params = useParams<RouterParams>();
  const [issueData, setIssueData] = React.useState<Nullable<Issue.IssueFullEntity>>(null);
  const [timeTracking, setTimeTracking] = React.useState<Nullable<TimeTrackingData>>(null);
  const [comments, setComments] = React.useState<Nullable<CommentsData>>(null);
  const issueDialogConfig = useDialog<ISSUE_DIALOG_MODES>(ISSUE_DIALOG_MODES.EDIT);

  const getIssueDetails = React.useCallback(() => {
    Api.get(`issues/${params.id}/full`)
      .then((response: ApiResponse) => response.json())
      .then((data: Issue.IssueFullEntity) => {
        setIssueData(data);
      });
  }, [params.id]);

  React.useEffect(() => {
    getIssueDetails();
  }, [getIssueDetails]);

  React.useEffect(() => {
    if (issueData) {
      const timeTrackingPromise = Api.get(`issues/${issueData.id}/time_tracking`);
      const commentsPromise = Api.get(`issues/${issueData.id}/comments`);

      Promise.all([timeTrackingPromise, commentsPromise])
        .then((values) => Promise.all(values.map((value) => value.json())))
        .then(([timeTrackingData, commentsData]) => {
          setTimeTracking(timeTrackingData);
          setComments(commentsData);
        });
    }
  }, [issueData]);

  if (!issueData) return null;

  const renderTitle = (): string => {
    return `[${issueData.project.code}-${issueData.key}] ${issueData.title}`;
  };

  const handleRefreshingComments = async (page?: number): Promise<void> => {
    const result = await Api.get(`issues/${issueData.id}/comments`, { page });

    if (result.status === 200) {
      const json = await result.json();
      setComments(json);
    }
  };

  const handleOpeningAddSubtask = async (): Promise<void> => {
    const result = await issueDialogConfig.handleOpen(ISSUE_DIALOG_MODES.ADD_SUBTASK, {
      parentId: issueData.id,
      initialSprintId: issueData.sprint?.id
    });

    if (result) {
      getIssueDetails();
    }
  };

  const handleOpeningEditIssue = async (): Promise<void> => {
    const result = await issueDialogConfig.handleOpen(ISSUE_DIALOG_MODES.EDIT, {
      issueId: issueData.id
    });

    if (result) {
      getIssueDetails();
    }
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <StyledFlexContainer>
        <Heading5>{renderTitle()}</Heading5>
      </StyledFlexContainer>
      <StyledHorizontalContainer>
        <StyledCenterSectionContainer>
          <IssueCenterInfoSection
            issue={issueData}
            handleOpeningEditIssue={handleOpeningEditIssue}
          />
          <IssueDescriptionSection description={issueData.description} />
          {comments && (
            <IssueCommentsSection
              issueComments={comments}
              issueId={issueData.id}
              handleRefreshingComments={handleRefreshingComments}
            />
          )}
        </StyledCenterSectionContainer>
        <StyledRightSectionContainer>
          <IssueRightInfoSection issue={issueData} handleRefreshing={getIssueDetails} />
          {timeTracking && <IssueTimeTrackingSection timeTrackingData={timeTracking} />}
          {issueData.type !== ISSUE_TYPE.SUBTASK && (
            <IssueSubtasksSection
              subtasks={issueData.subtasks}
              handleOpeningAddSubtask={handleOpeningAddSubtask}
            />
          )}
        </StyledRightSectionContainer>
      </StyledHorizontalContainer>
      <DialogComponent
        isOpen={issueDialogConfig.isOpen}
        handleClose={issueDialogConfig.handleClose}
      >
        <IssueDialog
          mode={issueDialogConfig.dialogMode}
          handleClose={issueDialogConfig.handleClose}
          handleSubmitting={issueDialogConfig.handleSubmit}
          issueId={issueDialogConfig.params.issueId}
          parentId={issueDialogConfig.params.parentId}
          initialSprintId={issueDialogConfig.params.initialSprintId}
        />
      </DialogComponent>
    </VerticalPageWrapper>
  );
};
