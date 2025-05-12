import { ACCOUNT_TYPES } from '../constants/model.constants.mjs';

// this schema is used to validate user request for adding a account
export const addAccountValidatedReq = {
  balance: {
    optional: true,
    notEmpty: { errorMessage: 'Balance is required' },
    isNumeric: { errorMessage: 'Balance must be a number' },
  },
  accountType: {
    notEmpty: { errorMessage: 'Account type is required' },
    isIn: {
      options: [ACCOUNT_TYPES],
      errorMessage: `Account type must be one of: ${ACCOUNT_TYPES.join(', ')}`,
    },
  },
  customerRefId: {
    notEmpty: { errorMessage: 'Customer ref Id is required' },
    isMongoId: { errorMessage: 'Customer ref Id is not a valid MongoDB ID' },
  },
  primary: {
    optional: true,
    notEmpty: { errorMessage: 'Primary flag is required' },
    isBoolean: { errorMessage: 'Primary must be true or false' },
  },
};
