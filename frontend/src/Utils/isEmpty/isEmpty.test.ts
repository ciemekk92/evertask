import { isEmpty } from './isEmpty';

describe('isEmpty', () => {
  test('should return true for empty object', () => {
    expect(isEmpty({})).toEqual(true);
  });

  test('should return true for empty array', () => {
    expect(isEmpty([])).toEqual(true);
  });

  test('should return false for object with any key', () => {
    expect(isEmpty({ testKey: 'test ' })).toEqual(false);
  });

  test('should return false for an array with any element', () => {
    expect(isEmpty([1, 2, 3])).toEqual(false);
  });

  test('should return false for null or undefined value', () => {
    expect(isEmpty(null)).toEqual(false);
    expect(isEmpty(undefined)).toEqual(false);
  });
});
