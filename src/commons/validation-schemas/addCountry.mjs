// this is a validation schema for validating addition of a country
import { Patterns } from '../constants/patters.contants.mjs';
export const addCountryValidatedReq = {
  country: {
    notEmpty: { errorMessage: 'Country name is required' },
    isString: { errorMessage: 'Country name must be a string' },
  },
  code: {
    notEmpty: { errorMessage: 'Country code is required' },
    isString: { errorMessage: 'Country code must be a string' },
    isLength: {
      options: { min: 2, max: 3 },
      errorMessage: 'Country code must be 2 or 3 characters',
    },
  },
  phoneCode: {
    notEmpty: { errorMessage: 'Phone code is required' },
    isString: { errorMessage: 'Phone code must be a string' },
    matches: {
      options: Patterns.phoneCode,
      errorMessage: 'Phone code must be in format +<digits> (e.g. +91)',
    },
  },
};
