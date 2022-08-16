import { TFunction } from 'react-i18next';

export const formatLegendText = (value: string, t: TFunction<'translation', undefined>): string => {
  return t(`statistics.${value}`);
};
