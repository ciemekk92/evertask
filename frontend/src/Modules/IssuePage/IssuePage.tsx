import React from 'react';
import { useParams } from 'react-router';
import { StyledHorizontalContainer, VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';
import { Issue } from 'Types/Issue';
import { ApiResponse } from 'Types/Response';
import { Api } from 'Utils/Api';
import {
  IssueCenterInfoSection,
  IssueDescriptionSection,
  IssueCommentsSection,
  IssueRightInfoSection,
  IssueTimeTrackingSection
} from './components';
import { TimeTrackingData, CommentsData } from './fixtures';
import { StyledCenterSectionContainer, StyledRightSectionContainer } from './IssuePage.styled';

export const IssuePage = (): Nullable<JSX.Element> => {
  const params = useParams<RouterParams>();
  const [issueData, setIssueData] = React.useState<Nullable<Issue.IssueFullEntity>>(null);
  const [timeTracking, setTimeTracking] = React.useState<Nullable<TimeTrackingData>>(null);
  const [comments, setComments] = React.useState<Nullable<CommentsData>>(null);

  React.useEffect(() => {
    Api.get(`issues/${params.id}/full`)
      .then((response: ApiResponse) => response.json())
      .then((data: Issue.IssueFullEntity) => {
        setIssueData(data);
      });
  }, [params.id]);

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

  const handleRefreshingComments = async (): Promise<void> => {
    const result = await Api.get(`issues/${issueData.id}/comments`);

    if (result.status === 200) {
      const json = await result.json();
      setComments(json);
    }
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <StyledFlexContainer>
        <Heading5>{renderTitle()}</Heading5>
      </StyledFlexContainer>
      <StyledHorizontalContainer>
        <StyledCenterSectionContainer>
          <IssueCenterInfoSection issue={issueData} />
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
          <IssueRightInfoSection issue={issueData} />
          {timeTracking && <IssueTimeTrackingSection timeTrackingData={timeTracking} />}
        </StyledRightSectionContainer>
      </StyledHorizontalContainer>
    </VerticalPageWrapper>
  );
};
