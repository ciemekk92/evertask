import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { DropdownWithSearch } from 'Shared/Elements/DropdownWithSearch';
import { DROPDOWN_MENU_POSITION } from 'Shared/Elements/DropdownMenu';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { UserCircle } from 'Shared/UserCircle';
import { ApplicationState } from 'Stores/store';
import { actionCreators } from 'Stores/Organisation';
import { Issue } from 'Types/Issue';
import { User } from 'Types/User';
import { Api } from 'Utils/Api';
import { formatDateForDisplayWithTime } from 'Utils/formatDate';
import { StyledField, StyledFieldLabel } from '../Shared.styled';
import { AssigneeLabel } from './components';
import {
  StyledAssigneeContainer,
  StyledUserContainer,
  StyledUserName
} from './IssueRightInfoSection.styled';

interface Props {
  issue: Issue.IssueFullEntity;
  handleRefreshing: VoidFunctionNoArgs;
}

export const IssueRightInfoSection = ({ issue, handleRefreshing }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentProject = CurrentProjectModel.currentProjectValue;
  const organisationMembersState = useSelector(
    (state: ApplicationState) => (state.organisation ? state.organisation.organisationMembers : []),
    shallowEqual
  );

  React.useEffect(() => {
    dispatch(actionCreators.getOrganisationMembers(currentProject.organisationId));
  }, [currentProject.organisationId, dispatch]);

  const handleSelectingAssignee = async (id: Nullable<Id>): Promise<void> => {
    const result = await Api.put(`issues/${issue.id}/assign_user`, { assigneeId: id });

    if (result.status === 204) {
      handleRefreshing();
    }
  };

  const getOrganisationMembers = (): Util.MenuOptionWithSearch[] => {
    const emptyOption = {
      searchable: t('issuePage.right.unassigned'),
      label: <AssigneeLabel user={null} />,
      value: null
    };
    const members = organisationMembersState.map((user: User.UserEntity) => {
      const fullName = `${user.firstName} ${user.lastName}`;

      return {
        searchable: fullName,
        label: <AssigneeLabel user={user} />,
        value: user.id
      };
    });

    return [emptyOption, ...members];
  };

  const renderUserField = (
    user: Nullable<User.UserBasicEntity>,
    fieldKey: 'assignee' | 'reporter'
  ): JSX.Element => {
    const fullName = user ? `${user.firstName} ${user.lastName}` : t('issuePage.right.unassigned');

    if (fieldKey === 'assignee') {
      return (
        <StyledField>
          <StyledFieldLabel>{t(`issuePage.right.${fieldKey}`)}</StyledFieldLabel>
          <StyledAssigneeContainer>
            <UserCircle imageSrc={user ? user.avatar : null} label={fullName} />
            <StyledUserName>{fullName}</StyledUserName>
            <DropdownWithSearch
              position={DROPDOWN_MENU_POSITION.BOTTOM_LEFT}
              onChange={handleSelectingAssignee}
              options={getOrganisationMembers()}
            />
          </StyledAssigneeContainer>
        </StyledField>
      );
    }

    return (
      <StyledField>
        <StyledFieldLabel>{t(`issuePage.right.${fieldKey}`)}</StyledFieldLabel>
        <StyledUserContainer>
          <UserCircle imageSrc={user ? user.avatar : null} label={fullName} />
          <StyledUserName>{fullName}</StyledUserName>
        </StyledUserContainer>
      </StyledField>
    );
  };

  const renderDateField = (
    date: Nullable<string>,
    fieldKey: 'createdAt' | 'updatedAt'
  ): Nullable<JSX.Element> => {
    if (!date) {
      return null;
    }

    return (
      <StyledField>
        <StyledFieldLabel>{t(`issuePage.right.${fieldKey}`)}</StyledFieldLabel>
        <p>{formatDateForDisplayWithTime(date)}</p>
      </StyledField>
    );
  };

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('issuePage.right.title')}</Heading6>
      </StyledSectionHeaderRow>
      {renderUserField(issue.assignee, 'assignee')}
      {renderUserField(issue.reporter, 'reporter')}
      {renderDateField(issue.createdAt, 'createdAt')}
      {renderDateField(issue.updatedAt, 'updatedAt')}
    </StyledSectionWrapper>
  );
};
