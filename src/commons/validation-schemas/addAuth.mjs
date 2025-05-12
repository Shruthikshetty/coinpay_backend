//this validates the request body of adding auth for a customer

export const addAuthValidatedReq = {
  customerRefId: {
    notEmpty: { errorMessage: 'customer Id is required' },
    isString: { errorMessage: 'customer must be string' },
  },
  password: {
    notEmpty: { errorMessage: 'password can not be empty' },
    isString: { errorMessage: 'password must be string' },
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
