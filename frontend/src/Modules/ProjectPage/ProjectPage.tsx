import React from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'Stores/store';
import { actionCreators, ProjectState } from 'Stores/Project';
import { VerticalPageWrapper } from 'Shared/PageWrappers';
import { isDefined } from 'Utils/isDefined';

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
      dispatch(actionCreators.getCurrentProject(params.id));
    }
  }, [params.id, dispatch]);

  if (!projectState) {
    return null;
  }

  return <VerticalPageWrapper>{projectState.currentProject.name}</VerticalPageWrapper>;
};
