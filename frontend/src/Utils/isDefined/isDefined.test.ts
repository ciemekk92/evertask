import { isDefined } from './isDefined';

describe('isDefined', () => {
  test('should return false for undefined value', () => {
    const obj: { value?: string } = { value: 'test' };
    delete obj.value;

    expect(isDefined(obj.value)).toEqual(false);
  });

  test('should return false for null value', () => {
    const obj = { value: null };

    expect(isDefined(obj.value)).toEqual(false);
  });

  test('should return true for other values', () => {
    const obj = {
      testStr: 'test',
      testNum: 1,
      testBool: true,
      testArr: []
    };

    expect(isDefined(obj.testStr)).toEqual(true);
    expect(isDefined(obj.testNum)).toEqual(true);
    expect(isDefined(obj.testBool)).toEqual(true);
    expect(isDefined(obj.testArr)).toEqual(true);
  });
});
