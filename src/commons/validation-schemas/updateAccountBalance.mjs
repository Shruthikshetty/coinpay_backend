// This validates the request body for getting accounts of a customer
export const updateAccountBalanceValidateReq = {
  accountRefId: {
    notEmpty: { errorMessage: 'Account ref ID is required' },
    isString: { errorMessage: 'Account ref ID must be a string' },
  },
  balance: {
    notEmpty: { errorMessage: 'Balance is required' },
    isNumeric: {
      errorMessage: 'Balance should be number',
    },
  },
};
