import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { OrganisationForm } from 'Shared/Forms/OrganisationForm';
import { ModalDialog } from 'Shared/ModalDialog';
import { actionCreators as userActionCreators } from 'Stores/User';
import { Api } from 'Utils/Api';
import { StyledDialogContent } from './OrganisationDialog.styled';

interface Props {
  organisationId?: Id;
  handleClose: VoidFunctionNoArgs;
}

interface OrganisationData {
  name: string;
  description: string;
}

export const OrganisationDialog = ({ organisationId, handleClose }: Props): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = async (values: OrganisationData): Promise<void> => {
    const result = await Api.put(`organisations/${organisationId}`, values);

    if (result.status === 204) {
      dispatch(userActionCreators.getOrganisation());
      handleClose();
    }
  };

  return (
    <ModalDialog header={t('organisationDialog.title')}>
      <StyledDialogContent>
        <OrganisationForm
          handleSubmit={onSubmit}
          editModeConfig={{ organisationId, handleClose }}
        />
      </StyledDialogContent>
    </ModalDialog>
  );
};
