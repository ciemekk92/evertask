export const capitalizeFirstLetter = (candidate: string): string => {
  return candidate.charAt(0).toUpperCase() + candidate.slice(1).toLowerCase();
};
