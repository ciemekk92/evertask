import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'Stores/store';
import { actionCreators, ProjectState } from 'Stores/Project';
import {
  VerticalPageWrapper,
  StyledHorizontalContainer,
  StyledSectionContainer
} from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { isDefined } from 'Utils/isDefined';
import { ProjectInfoSection } from './components';
import { StyledHeaderWrapper } from './ProjectPage.styled';

type Params = {
  id: Id;
};

export const ProjectPage = (): Nullable<JSX.Element> => {
  const params = useParams<Params>();
  const dispatch = useDispatch();
  const projectState: Nullable<ProjectState> = useSelector((state: ApplicationState) =>
    state.project ? state.project : null
  );

  React.useEffect(() => {
    if (isDefined(params.id)) {
      dispatch(actionCreators.getSelectedProject(params.id));
    }
  }, [params.id, dispatch]);

  if (!projectState) {
    return null;
  }

  const renderProjectInfo = () => <ProjectInfoSection project={projectState.selectedProject} />;

  return (
    <VerticalPageWrapper alignItems="unset">
      <StyledHeaderWrapper>
        <Heading5>{projectState.selectedProject.name}</Heading5>
      </StyledHeaderWrapper>
      <StyledHorizontalContainer>
        <StyledSectionContainer>{renderProjectInfo()}</StyledSectionContainer>
      </StyledHorizontalContainer>
    </VerticalPageWrapper>
  );
};
