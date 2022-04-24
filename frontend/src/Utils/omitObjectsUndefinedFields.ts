import { isDefined } from './isDefined';

interface CandidateObject {
  [x: string]: Unrestricted;
}

export const omitObjectsUndefinedFields = (obj: CandidateObject) => {
  for (const key in obj) {
    if (!isDefined(obj[key])) {
      delete obj[key];
    }
  }

  return obj;
};
