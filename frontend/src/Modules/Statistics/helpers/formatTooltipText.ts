import { TFunction } from 'react-i18next';

export const formatTooltipText = (
  value: string | number,
  name: string,
  t: TFunction<'translation', undefined>
): [string | number, string] => {
  return [value, t(`statistics.${name}`)];
};
