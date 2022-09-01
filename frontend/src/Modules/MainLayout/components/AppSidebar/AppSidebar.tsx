import React from 'react';
import { CurrentProjectModel } from 'Models/CurrentProjectModel';
import { AGILE_SIDEBAR_ROUTES, KANBAN_SIDEBAR_ROUTES, SidebarRoute } from 'Routes/constants';
import { PROJECT_METHODOLOGIES } from 'Shared/constants';
import { Project } from 'Types/Project';
import { SidebarItem } from './components';
import { SidebarBody, SidebarList } from './AppSidebar.styled';

export const AppSidebar = (): JSX.Element => {
  const [currentProjectMethodology, setCurrentProjectMethodology] =
    React.useState<PROJECT_METHODOLOGIES>(CurrentProjectModel.currentProjectValue.methodology);

  React.useEffect(() => {
    const subscription = CurrentProjectModel.currentProject.subscribe(
      (project: Project.ProjectEntity) => {
        setCurrentProjectMethodology(project.methodology);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const routes: SidebarRoute[] = React.useMemo(
    () =>
      currentProjectMethodology === PROJECT_METHODOLOGIES.AGILE
        ? AGILE_SIDEBAR_ROUTES
        : KANBAN_SIDEBAR_ROUTES,
    [currentProjectMethodology]
  );

  const renderRoutes = (): JSX.Element[] => {
    return routes.map((route: SidebarRoute) => (
      <SidebarItem
        key={route.iconName}
        iconName={route.iconName}
        name={route.name}
        route={route.route}
      />
    ));
  };

  return (
    <SidebarBody>
      <SidebarList>{renderRoutes()}</SidebarList>
    </SidebarBody>
  );
};
