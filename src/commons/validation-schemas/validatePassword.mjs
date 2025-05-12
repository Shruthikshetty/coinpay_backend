//this validates the request body for validating password

export const validatedPasswordReq = {
  customerRefId: {
    notEmpty: { errorMessage: 'customer Id is required' },
    isString: { errorMessage: 'customer must be string' },
  },
  password: {
    notEmpty: { errorMessage: 'PIN is required' },
    isString: { errorMessage: 'PIN must be a string' },
  },
};
