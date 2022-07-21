export const convertHoursToDayHours = (input: number): string => {
  const days = Math.floor(input / 8);
  const hoursRemainder = input % 8;

  return days ? `${days}d ${hoursRemainder}h` : `${hoursRemainder}h`;
};
