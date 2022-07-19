export const convertHoursToDayHours = (input: number): string => {
  const days = Math.floor(input / 24);
  const hoursRemainder = input % 24;

  return days ? `${days}d ${hoursRemainder}h` : `${hoursRemainder}h`;
};
