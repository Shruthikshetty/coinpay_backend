//this validates the request body for validating PIN

export const validatedPinReq = {
  customerRefId: {
    notEmpty: { errorMessage: 'customer Id is required' },
    isString: { errorMessage: 'customer must be string' },
  },
  pin: {
    notEmpty: { errorMessage: 'PIN is required' },
    isString: { errorMessage: 'PIN must be a string' },
    isLength: {
      options: { min: 4, max: 4 },
      errorMessage: 'PIN must be between 4 digits',
    },
  },
};
