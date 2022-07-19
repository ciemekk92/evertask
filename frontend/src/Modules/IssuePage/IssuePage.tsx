import React from 'react';
import { useParams } from 'react-router';
import { StyledHorizontalContainer, VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { Issue } from 'Types/Issue';
import { ApiResponse } from 'Types/Response';
import { Api } from 'Utils/Api';
import {
  IssueCenterInfoSection,
  IssueCommentsSection,
  IssueRightInfoSection,
  IssueTimeTrackingSection,
  TimeTrackingData
} from './components';
import {
  StyledCenterSectionContainer,
  StyledHeaderWrapper,
  StyledRightSectionContainer
} from './IssuePage.styled';

export const IssuePage = (): Nullable<JSX.Element> => {
  const params = useParams<RouterParams>();
  const [issueData, setIssueData] = React.useState<Nullable<Issue.IssueFullEntity>>(null);
  const [timeTracking, setTimeTracking] = React.useState<Nullable<TimeTrackingData>>(null);

  React.useEffect(() => {
    Api.get(`issues/${params.id}`)
      .then((response: ApiResponse) => response.json())
      .then((data: Issue.IssueFullEntity) => {
        setIssueData(data);
      });
  }, [params.id]);

  React.useEffect(() => {
    if (issueData) {
      Api.get(`issues/${issueData.id}/time_tracking`)
        .then((response: ApiResponse) => response.json())
        .then((data: TimeTrackingData) => {
          setTimeTracking(data);
        });
    }
  }, [issueData]);

  if (!issueData) return null;

  const renderTitle = (): string => {
    return `[${issueData.project.code}-${issueData.key}] ${issueData.title}`;
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <StyledHeaderWrapper>
        <Heading5>{renderTitle()}</Heading5>
      </StyledHeaderWrapper>
      <StyledHorizontalContainer>
        <StyledCenterSectionContainer>
          <IssueCenterInfoSection />
          <IssueCommentsSection />
        </StyledCenterSectionContainer>
        <StyledRightSectionContainer>
          <IssueRightInfoSection issue={issueData} />
          {timeTracking && <IssueTimeTrackingSection timeTrackingData={timeTracking} />}
        </StyledRightSectionContainer>
      </StyledHorizontalContainer>
    </VerticalPageWrapper>
  );
};
