// this contains the validation for req body of add message
export const addMessageValidationReq = {
  customerRefId: {
    notEmpty: { errorMessage: 'Customer ref Id is required' },
    isMongoId: { errorMessage: 'Customer ref Id is not a valid ID' },
  },
  message: {
    notEmpty: { errorMessage: 'Message is required' },
    isString: { errorMessage: 'Message should be string' },
  },
};
