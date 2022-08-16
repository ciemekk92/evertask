export const getISODateStringFromDate = (toExtract: Date): string => {
  return toExtract.toISOString().split('T')[0];
};
