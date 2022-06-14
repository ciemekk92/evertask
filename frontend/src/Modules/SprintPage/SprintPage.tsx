import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { StyledHorizontalContainer, VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { Container } from 'Hooks/useLoading';
import { ApplicationState } from 'Stores/store';
import { isDefined } from 'Utils/isDefined';
import { actionCreators, SprintState } from 'Stores/Sprint';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { SprintInfoSection } from './components';
import { SprintDialog } from '../SprintDialog';
import { SPRINT_DIALOG_MODES } from '../SprintDialog/fixtures';
import {
  StyledHeaderWrapper,
  StyledLargeSectionContainer,
  StyledSmallSectionContainer
} from './SprintPage.styled';

export const SprintPage = (): Nullable<JSX.Element> => {
  const dispatch = useDispatch();
  const params = useParams<RouterParams>();

  const sprintState: Nullable<SprintState> = useSelector(
    (state: ApplicationState) => (state.sprint ? state.sprint : null),
    shallowEqual
  );

  const sprintDialogConfig = useDialog<SPRINT_DIALOG_MODES>(SPRINT_DIALOG_MODES.ADD);

  React.useEffect(() => {
    if (isDefined(params.id)) {
      dispatch(actionCreators.getSelectedSprint(params.id));
      dispatch(actionCreators.getActiveMembers(params.id));
      dispatch(actionCreators.getSprintIssues(params.id));
    }
  }, [params.id, dispatch]);

  if (!sprintState || !params.id) {
    return null;
  }

  const handleEditingSprint = () => {
    sprintDialogConfig.handleOpen(SPRINT_DIALOG_MODES.EDIT);
  };

  const renderSprintInfo = (): JSX.Element => (
    <SprintInfoSection onEditClick={handleEditingSprint} sprint={sprintState.selectedSprint} />
  );

  return (
    <VerticalPageWrapper alignItems="unset">
      <Container isLoading={sprintState.isLoading} />
      <StyledHeaderWrapper>
        <Heading5>{`Sprint ${sprintState.selectedSprint.ordinal}`}</Heading5>
      </StyledHeaderWrapper>
      <StyledHorizontalContainer>
        <StyledSmallSectionContainer>{renderSprintInfo()}</StyledSmallSectionContainer>
        <StyledLargeSectionContainer></StyledLargeSectionContainer>
      </StyledHorizontalContainer>
      <DialogComponent
        isOpen={sprintDialogConfig.isOpen}
        handleClose={sprintDialogConfig.handleClose}
      >
        <SprintDialog
          mode={SPRINT_DIALOG_MODES.EDIT}
          handleClose={sprintDialogConfig.handleClose}
          sprintId={params.id}
          projectId={sprintState.selectedSprint.projectId}
        />
      </DialogComponent>
    </VerticalPageWrapper>
  );
};
