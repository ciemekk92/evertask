import { formatDateForInput, formatDateForDisplay } from './formatDate';

describe('formatDateForInput', () => {
  test('should format date from timestamp', () => {
    expect(formatDateForInput(1652988491836)).toEqual('2022-05-19');
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
