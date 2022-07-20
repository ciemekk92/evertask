interface NullableCandidate {
  [x: string]: Nullable<any>;
}

interface ConvertedCandidate {
  [x: string]: any;
}

export const convertNullFieldsToEmptyString = (input: NullableCandidate): ConvertedCandidate => {
  const converted = new Map(Object.entries(input));

  for (const [key, value] of converted) {
    if (input[key] === null) {
      converted.set(key, '');
    } else if (typeof input[key] === 'object' && !Array.isArray(input)) {
      converted.set(key, convertNullFieldsToEmptyString(input[key]));
    } else {
      converted.set(key, value);
    }
  }

  return Object.fromEntries(converted) as ConvertedCandidate;
};
