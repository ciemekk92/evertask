import { convertNullFieldsToEmptyString } from './convertNullFieldsToEmptyString';

const given = {
  fieldOne: 'value',
  fieldTwo: null,
  fieldThree: 3,
  fieldFour: {
    subField: null
  }
};

const expected = {
  fieldOne: 'value',
  fieldTwo: '',
  fieldThree: 3,
  fieldFour: {
    subField: ''
  }
};

describe('convertNullFieldsToEmptyString', () => {
  test('should convert null values in object to empty strings', () => {
    expect(convertNullFieldsToEmptyString(given)).toEqual(expected);
  });
});
