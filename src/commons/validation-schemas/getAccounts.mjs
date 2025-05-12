// This validates the request body for getting accounts of a customer
export const getAccountsValidateReq = {
  customerRefId: {
    notEmpty: { errorMessage: 'Customer ref ID is required' },
    isString: { errorMessage: 'Customer ref ID must be a string' },
  },
};
