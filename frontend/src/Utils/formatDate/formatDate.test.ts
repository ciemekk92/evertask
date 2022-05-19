import { formatDate } from './formatDate';

describe('formatDate', () => {
  test('should format date from timestamp', () => {
    expect(formatDate(1652988491836)).toEqual('2022-05-19');
  });

  test('should format date from string', () => {
    expect(formatDate('Thu May 19 2022')).toEqual('2022-05-19');
  });
});
