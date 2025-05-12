// this contains the validation for req body of get message
export const getMessageValidationReq = {
  customerRefId: {
    notEmpty: { errorMessage: 'Customer ref Id is required' },
    isMongoId: { errorMessage: 'Customer ref Id is not a valid ID' },
  },
  start: {
    optional: true,
    isInt: {
      errorMessage: 'start should be a integer',
    },
  },
  limit: {
    optional: true,
    isInt: {
      errorMessage: 'limit should be a integer',
    },
  },
};
