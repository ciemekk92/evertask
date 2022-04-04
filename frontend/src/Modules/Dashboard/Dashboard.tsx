import React from 'react';
import { StyledDashboardColumn, StyledDashboardWrapper } from './Dashboard.styled';
import { DashboardAssignedIssues, DashboardProjects } from './components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Project } from 'Types/Project';
import { Issue } from 'Types/Issue';
import { ApplicationState } from 'Stores/store';
import { actionCreators as projectActionCreators } from 'Stores/Project';
import { actionCreators as issueActionCreators } from 'Stores/Issue';

export const Dashboard = (): JSX.Element => {
  const dispatch = useDispatch();
  const userProjects: Project[] = useSelector(
    (state: ApplicationState) => (state.project ? state.project.userProjects : []),
    shallowEqual
  );

  const assignedIssues: Issue[] = useSelector(
    (state: ApplicationState) => (state.issue ? state.issue.assignedIssues : []),
    shallowEqual
  );

  React.useEffect(() => {
    dispatch(projectActionCreators.getUserProjects());
    dispatch(issueActionCreators.getAssignedIssues());
  }, []);

  return (
    <StyledDashboardWrapper>
      <StyledDashboardColumn>
        <DashboardProjects data={userProjects} />
      </StyledDashboardColumn>
      <StyledDashboardColumn>
        <DashboardAssignedIssues data={assignedIssues} />
      </StyledDashboardColumn>
    </StyledDashboardWrapper>
  );
};
