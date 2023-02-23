import { convertNullFieldsToEmptyString } from './convertNullFieldsToEmptyString';

const given = {
  fieldOne: 'value',
  fieldTwo: null,
  fieldThree: 3,
  fieldFour: {
    subFieldOne: null,
    subFieldTwo: {
      subSubField: null
    }
  },
  fieldFive: ['array value']
};

const expected = {
  fieldOne: 'value',
  fieldTwo: '',
  fieldThree: 3,
  fieldFour: {
    subFieldOne: '',
    subFieldTwo: {
      subSubField: ''
    }
  },
  fieldFive: ['array value']
};

describe('convertNullFieldsToEmptyString', () => {
  test('should convert null values in object to empty strings', () => {
    expect(convertNullFieldsToEmptyString(given)).toEqual(expected);
  });
});
