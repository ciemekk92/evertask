import { convertHoursToDayHours } from './convertHoursToDayHours';

describe('convertHoursToDayHours', () => {
  test('should return string with only hours if there is less than 24', () => {
    expect(convertHoursToDayHours(23)).toEqual('23h');
  });

  test('should return string with days and hours if there is more than 24', () => {
    expect(convertHoursToDayHours(30)).toEqual('1d 6h');
  });
});
