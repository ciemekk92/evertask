export interface SidebarRoute {
  name: string;
  iconName: string;
  route: string;
}

export const KANBAN_SIDEBAR_ROUTES: SidebarRoute[] = [
  {
    name: 'dashboard',
    iconName: 'dashboard',
    route: '/'
  },
  {
    name: 'myOrganisation',
    iconName: 'groups',
    route: '/organisation'
  },
  {
    name: 'board',
    iconName: 'library_add_check',
    route: '/board'
  },
  {
    name: 'backlog',
    iconName: 'task',
    route: '/backlog'
  },
  {
    name: 'statistics',
    iconName: 'analytics',
    route: '/statistics'
  }
];

export const AGILE_SIDEBAR_ROUTES: SidebarRoute[] = [
  {
    name: 'dashboard',
    iconName: 'dashboard',
    route: '/'
  },
  {
    name: 'myOrganisation',
    iconName: 'groups',
    route: '/organisation'
  },
  {
    name: 'sprints',
    iconName: 'description',
    route: '/sprints'
  },
  {
    name: 'board',
    iconName: 'library_add_check',
    route: '/board'
  },
  {
    name: 'backlog',
    iconName: 'task',
    route: '/backlog'
  },
  {
    name: 'statistics',
    iconName: 'analytics',
    route: '/statistics'
  }
];
