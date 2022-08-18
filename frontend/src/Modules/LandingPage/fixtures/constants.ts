interface LandingFeature {
  iconName: string;
  translationKey: string;
}

export const landingFeatures: LandingFeature[] = [
  { iconName: 'groups', translationKey: 'organisations' },
  { iconName: 'description', translationKey: 'projects' },
  { iconName: 'directions_run', translationKey: 'methodologies' },
  { iconName: 'assignment', translationKey: 'boards' },
  { iconName: 'bar_chart', translationKey: 'statistics' }
];
