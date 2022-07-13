import { darken, lighten } from 'polished';

export const getLightTheme = (primary: string) => ({
  colorScheme: 'light',
  primary,
  primaryDark: darken(0.07, primary),
  primaryLight: lighten(0.4, primary),
  secondary: lighten(0.1, primary),
  background: '#D4D4D4',
  surface: '#F3F3F3',
  surfaceSecondary: '#E1E1E1',
  surfaceTertiary: '#BEBEBE',
  primaryText: '#212121',
  secondaryText: '#757575',
  disabled: '#666',
  disabledText: '#CCC',
  textOnPrimary: '#E1E1E1',
  textOnLight: '#222',
  error: '#D33636',
  surfaceTransparent: 'rgba(243,243,243,0.4)',
  boxShadow: 'rgba(102,102,102,0.4)',
  textShadow: 'rgba(31,31,31,0.4)'
});

export const getDarkTheme = (primary: string) => ({
  colorScheme: 'dark',
  primary,
  primaryDark: darken(0.07, primary),
  primaryLight: lighten(0.4, primary),
  secondary: lighten(0.1, primary),
  background: '#1F1F1F',
  surface: '#2F2F2F',
  surfaceSecondary: '#444444',
  surfaceTertiary: '#777777',
  primaryText: '#E1E1E1',
  secondaryText: '#999',
  disabled: '#666',
  disabledText: '#CCC',
  textOnPrimary: '#E1E1E1',
  textOnLight: '#222',
  error: '#D33636',
  surfaceTransparent: 'rgba(47,47,47,0.4)',
  boxShadow: 'rgba(31,31,31,0.4)',
  textShadow: 'rgba(0, 0, 0, 0.4)'
});
