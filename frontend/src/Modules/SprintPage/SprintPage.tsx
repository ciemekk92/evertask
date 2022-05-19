import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { VerticalPageWrapper, StyledHorizontalContainer } from 'Shared/PageWrappers';
import { Heading5 } from 'Shared/Typography';
import { Container } from 'Hooks/useLoading';
import { ApplicationState } from 'Stores/store';
import { isDefined } from 'Utils/isDefined';
import { actionCreators, SprintState } from 'Stores/Sprint';
import { SprintInfoSection } from './components';
import {
  StyledHeaderWrapper,
  StyledSmallSectionContainer,
  StyledLargeSectionContainer
} from './SprintPage.styled';

export const SprintPage = (): Nullable<JSX.Element> => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams<RouterParams>();

  const sprintState: Nullable<SprintState> = useSelector(
    (state: ApplicationState) => (state.sprint ? state.sprint : null),
    shallowEqual
  );

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

  const renderSprintInfo = (): JSX.Element => (
    <SprintInfoSection sprint={sprintState.selectedSprint} />
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
    </VerticalPageWrapper>
  );
};
