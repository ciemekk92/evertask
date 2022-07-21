import { convertHoursToDayHours } from './convertHoursToDayHours';

describe('convertHoursToDayHours', () => {
  test('should return string with only hours if there is less than 8', () => {
    expect(convertHoursToDayHours(7)).toEqual('7h');
  });

  test('should return string with days and hours if there is more than 8', () => {
    expect(convertHoursToDayHours(12)).toEqual('1d 4h');
  });
});
