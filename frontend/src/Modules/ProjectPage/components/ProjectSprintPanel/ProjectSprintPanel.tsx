import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledLink } from 'Shared/StyledLink';
import { StyledSprintPanel } from './ProjectSprintPanel.styled';

interface Props {
  sprint: Sprint.SprintEntity;
}

export const ProjectSprintPanel = ({ sprint }: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderUpdatedAtDate = (updatedAt: Nullable<string>) => {
    if (updatedAt) {
      return (
        <p>
          {t('general.updatedAt')}: {new Date(updatedAt).toLocaleString()}
        </p>
      );
    }

    return <p>{t('general.notUpdated')}</p>;
  };

  return (
    <StyledLink to={`/sprint/${sprint.id}`}>
      <StyledSprintPanel>
        <p>{`Sprint ${sprint.ordinal}`}</p>
        {renderUpdatedAtDate(sprint.updatedAt)}
      </StyledSprintPanel>
    </StyledLink>
  );
};
