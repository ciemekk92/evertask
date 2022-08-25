import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { DialogComponent, useDialog } from 'Hooks/useDialog';
import { StyledHorizontalContainer, VerticalPageWrapper } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { StyledFlexContainer } from 'Shared/SharedStyles.styled';
import { ApplicationState } from 'Stores/store';
import { actionCreators, SprintState } from 'Stores/Sprint';
import { isDefined } from 'Utils/isDefined';
import { SprintActiveMembersSection, SprintInfoSection, SprintIssuesSection } from './components';
import { SprintDialog, SPRINT_DIALOG_MODES } from '../SprintDialog';
import { StyledLargeSectionContainer, StyledSmallSectionContainer } from './SprintPage.styled';

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

  const handleEditingSprint = (): void => {
    sprintDialogConfig.handleOpen(SPRINT_DIALOG_MODES.EDIT);
  };

  return (
    <VerticalPageWrapper alignItems="unset">
      <StyledFlexContainer>
        <Heading5>{`Sprint ${sprintState.selectedSprint.ordinal}`}</Heading5>
      </StyledFlexContainer>
      <StyledHorizontalContainer>
        <StyledSmallSectionContainer>
          <SprintInfoSection
            onEditClick={handleEditingSprint}
            sprint={sprintState.selectedSprint}
          />
          <SprintActiveMembersSection activeMembers={sprintState.activeMembers} />
        </StyledSmallSectionContainer>
        <StyledLargeSectionContainer>
          <SprintIssuesSection issues={sprintState.sprintIssues} />
        </StyledLargeSectionContainer>
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
