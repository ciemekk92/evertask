import React from 'react';
import { StyledDashboardColumn, StyledDashboardWrapper } from './Dashboard.styled';
import { DashboardAssignedIssues, DashboardProjects } from './components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Issue } from 'Types/Issue';
import { Project } from 'Types/Project';
import { ApplicationState } from 'Stores/store';
import { actionCreators as projectActionCreators } from 'Stores/Project';
import { actionCreators as issueActionCreators } from 'Stores/Issue';

export const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const organisationProjects: Project.ProjectEntity[] = useSelector(
    (state: ApplicationState) => (state.project ? state.project.organisationProjects : []),
    shallowEqual
  );

  const assignedIssues: Issue.IssueFullEntity[] = useSelector(
    (state: ApplicationState) => (state.issue ? state.issue.assignedIssues : []),
    shallowEqual
  );

  React.useEffect(() => {
    dispatch(projectActionCreators.getOrganisationsProjects());
    dispatch(issueActionCreators.getAssignedIssues());
  }, [dispatch]);

  return (
    <StyledDashboardWrapper>
      <StyledDashboardColumn>
        <DashboardProjects data={organisationProjects} />
      </StyledDashboardColumn>
      <StyledDashboardColumn>
        <DashboardAssignedIssues data={assignedIssues} />
      </StyledDashboardColumn>
    </StyledDashboardWrapper>
  );
};
