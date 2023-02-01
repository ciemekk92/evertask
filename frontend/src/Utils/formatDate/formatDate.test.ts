import {
  formatDateForInput,
  formatDateForDisplay,
  formatDateForDisplayWithTime
} from './formatDate';

describe('formatDateForInput', () => {
  test('should format date from timestamp', () => {
    expect(formatDateForInput(1652988491836)).toEqual('2022-05-19');
    console.log('test');
  });

  test('should format date from string', () => {
    expect(formatDateForInput('Thu May 19 2022')).toEqual('2022-05-19');
  });
});

describe('formatDateForDisplay', () => {
  test('should format date from timestamp', () => {
    expect(formatDateForDisplay(1652988491836)).toEqual('19.05.2022');
  });

  test('should format date from string', () => {
    expect(formatDateForDisplay('Thu May 19 2022')).toEqual('19.05.2022');
  });
});

describe('formatDateForDisplayWithTime', () => {
  test('should format date from timestamp to date with time', () => {
    expect(formatDateForDisplayWithTime(1652988491836)).toEqual('19.05.2022 21:28');
  });

  test('should format date from string to date with time', () => {
    expect(formatDateForDisplayWithTime('Thu May 19 2022')).toEqual('19.05.2022 00:00');
  });
});
