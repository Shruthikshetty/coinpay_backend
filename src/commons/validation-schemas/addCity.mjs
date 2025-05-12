// This is a validation schema for validating addition of a city
export const addCityValidatedReq = {
  city: {
    notEmpty: { errorMessage: 'City name is required' },
    isString: { errorMessage: 'City name must be a string' },
  },
  cityCode: {
    notEmpty: { errorMessage: 'City code is required' },
    isString: { errorMessage: 'City code must be a string' },
    isLength: {
      options: { min: 2, max: 10 },
      errorMessage: 'City code must be between 2 to 10 characters',
    },
  },
  countryRefId: {
    notEmpty: { errorMessage: 'Country ref id is required required' },
    isString: { errorMessage: 'country red should be string' },
  },
};
