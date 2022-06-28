import { capitalizeFirstLetter } from './capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  test('should transform all-capital string, to one with only first letter capitalized', () => {
    expect(capitalizeFirstLetter('TESTSTRING')).toEqual('Teststring');
  });

  test('should transform lowercase string, to one with only first letter capitalized', () => {
    expect(capitalizeFirstLetter('teststring')).toEqual('Teststring');
  });

  test('should not transform the string with first letter capitalized', () => {
    expect(capitalizeFirstLetter('Teststring')).toEqual('Teststring');
  });
});
