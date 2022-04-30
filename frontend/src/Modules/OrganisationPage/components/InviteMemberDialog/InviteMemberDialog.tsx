import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actionCreators as organisationActionCreators } from 'Stores/Organisation';
import { actionCreators as invitationsActionCreators } from 'Stores/OrganisationInvitation';
import { ApplicationState } from 'Stores/store';
import { User } from 'Types/User';
import { Api } from 'Utils/Api';
import { useLoading } from 'Hooks/useLoading';
import { LoadingModalDialog } from 'Shared/LoadingModalDialog';
import { ButtonFilled, ButtonOutline } from 'Shared/Elements/Buttons';
import { SearchInput } from 'Shared/Elements/SearchInput';
import { RadioField } from 'Shared/Elements/RadioField';
import { INVITE_MEMBER_DIALOG_MODES } from './fixtures';
import { StyledDialogContent } from './InviteMemberDialog.styled';

interface Props {
  mode: INVITE_MEMBER_DIALOG_MODES;
  handleClose: VoidFunctionNoArgs;
  organisationId?: Id;
}

export const InviteMemberDialog = ({ handleClose, organisationId }: Props): JSX.Element => {
  const [query, setQuery] = React.useState<string>('');
  const [userId, setUserId] = React.useState<Id>('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoading();

  React.useEffect(() => {
    dispatch(organisationActionCreators.getUnassignedUsers());
  }, []);

  const isOrganisationLoading = useSelector(
    (state: ApplicationState) => (state.organisation ? state.organisation.isLoading : false),
    shallowEqual
  );

  const unassignedUsers = useSelector(
    (state: ApplicationState) => (state.organisation ? state.organisation.unassignedUsers : []),
    shallowEqual
  );

  const isAppLoading = isLoading || isOrganisationLoading;
  const isSubmitDisabled = userId.length === 0;

  const onCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    handleClose();
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = async () => {
    if (organisationId) {
      startLoading();
      const result = await Api.post(`organisations/${organisationId}/invite_user`, {
        userId
      });
      if (result.status === 201) {
        handleClose();
        dispatch(invitationsActionCreators.getAllInvitationsForOrganisation(organisationId));
      }

      stopLoading();
    }
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      dispatch(organisationActionCreators.getUnassignedUsers(query));
    }
  };

  const handleSelectingUser = (id: Id) => () => {
    setUserId(id);
  };

  const renderFooter = (): JSX.Element => (
    <React.Fragment>
      <ButtonOutline onClick={onCancel}>{t('general.cancel')}</ButtonOutline>
      <ButtonFilled disabled={isSubmitDisabled} onClick={handleSubmit}>
        {t('general.submit')}
      </ButtonFilled>
    </React.Fragment>
  );

  const radioFieldFactory = (user: User): JSX.Element => (
    <RadioField
      id={user.id}
      key={user.id}
      label={`${user.firstName} ${user.lastName} (${user.username})`}
      checked={userId === user.id}
      onClick={handleSelectingUser(user.id)}
    />
  );

  const renderUnassignedUsers = (): JSX.Element[] | JSX.Element => {
    if (!unassignedUsers.length) {
      return <p>{t('inviteMemberDialog.noUsers')}</p>;
    }

    if (unassignedUsers.length > 10) {
      return unassignedUsers.slice(0, 9).map(radioFieldFactory);
    } else {
      return unassignedUsers.map(radioFieldFactory);
    }
  };

  return (
    <LoadingModalDialog
      isLoading={isAppLoading}
      header={t('inviteMemberDialog.title')}
      footer={renderFooter()}
    >
      <StyledDialogContent>
        <SearchInput
          value={query}
          onChange={onChange}
          onKeyDown={handleEnter}
          onIconClick={handleSubmit}
        />
        {renderUnassignedUsers()}
      </StyledDialogContent>
    </LoadingModalDialog>
  );
};
