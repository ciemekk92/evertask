import { isDefined } from '../isDefined';

export const isEmpty = (
  candidate: Maybe<{ [x: string]: Unrestricted } | Unrestricted[]>
): boolean => {
  if (!isDefined(candidate)) {
    return false;
  }

  return Object.keys(candidate).length === 0;
};
