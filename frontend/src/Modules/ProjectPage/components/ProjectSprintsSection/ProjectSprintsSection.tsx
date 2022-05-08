import React from 'react';
import { useTranslation } from 'react-i18next';
import { PermissionCheck } from 'Utils/PermissionCheck';
import { IconButton } from 'Shared/Elements/Buttons';
import { StyledSectionHeaderRow, StyledSectionWrapper } from 'Shared/PageWrappers';
import { Heading6 } from 'Shared/Typography';
import { ProjectSprintPanel } from '..';

interface Props {
  sprintsData: Sprint.SprintEntity[];
  handleOpeningAddSprint: VoidFunctionNoArgs;
}

export const ProjectSprintsSection = ({
  sprintsData,
  handleOpeningAddSprint
}: Props): JSX.Element => {
  const { t } = useTranslation();

  const renderSprintPanels = (): JSX.Element | JSX.Element[] => {
    if (!sprintsData.length) {
      return <p>{t('projectPage.noSprints')}</p>;
    }

    return sprintsData.map((sprint: Sprint.SprintEntity) => (
      <ProjectSprintPanel key={sprint.id} sprint={sprint} />
    ));
  };

  const renderAddSprintButton = (): Nullable<JSX.Element> => {
    if (PermissionCheck.isProjectAdmin) {
      return (
        <IconButton iconName="add" onClick={handleOpeningAddSprint}>
          {t('projectPage.addSprint')}
        </IconButton>
      );
    }

    return null;
  };

  return (
    <StyledSectionWrapper>
      <StyledSectionHeaderRow>
        <Heading6>{t('projectPage.sprints')}</Heading6>
        {renderAddSprintButton()}
      </StyledSectionHeaderRow>
      {renderSprintPanels()}
    </StyledSectionWrapper>
  );
};
