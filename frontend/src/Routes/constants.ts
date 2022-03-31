export interface SidebarRoute {
  name: string;
  iconName: string;
  route: string;
}

export const SIDEBAR_ROUTES: SidebarRoute[] = [
  {
    name: 'dashboard',
    iconName: 'dashboard',
    route: '/dashboard'
  },
  {
    name: 'calendar',
    iconName: 'event_note',
    route: '/calendar'
  },
  {
    name: 'sprints',
    iconName: 'alarm_on',
    route: '/sprints'
  },
  {
    name: 'tasks',
    iconName: 'task',
    route: '/tasks'
  }
];
