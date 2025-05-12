// This validates the request body for updating auth credentials for a customer

export const updateAuthValidatedReq = {
  customerRefId: {
    notEmpty: { errorMessage: 'Customer ID is required' },
    isString: { errorMessage: 'Customer ID must be a string' },
  },
  password: {
    optional: true,
    isString: { errorMessage: 'Password must be a string' },
  },
  pin: {
    optional: true,
    isString: { errorMessage: 'PIN must be a string' },
    isLength: {
      options: { min: 4, max: 4 },
      errorMessage: 'PIN must be between 4 digits',
    },
  },
};
