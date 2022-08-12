import { getISODateStringFromDate } from './getISODateStringFromDate';

describe('getISODateStringFromDate', () => {
  test('should extract ISO date string from Date object', () => {
    const testDate = new Date(1660287724299);

    expect(getISODateStringFromDate(testDate)).toEqual('2022-08-12');
  });
});
