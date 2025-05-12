import { SPENDING_TYPES } from '../constants/model.constants.mjs';
// validation schema for adding new transaction
export const addTransactionValidationReq = {
  fromAccountNumber: {
    notEmpty: { errorMessage: 'Sender account number is required' },
    isString: { errorMessage: 'Sender account number must be a string' },
  },
  toAccountNumber: {
    notEmpty: { errorMessage: 'Receiver account number is required' },
    isString: { errorMessage: 'Receiver account number must be a string' },
  },
  amount: {
    notEmpty: { errorMessage: 'Amount is required' },
    isFloat: {
      errorMessage: 'Amount must be a number greater than 0',
    },
  },
  category: {
    optional: true,
    isIn: {
      options: [SPENDING_TYPES],
      errorMessage: `Category must be one of: ${SPENDING_TYPES.join(', ')}`,
    },
  },
  notes: {
    optional: true,
    isString: { errorMessage: 'Notes must be a string' },
    isLength: {
      options: { max: 200 },
      errorMessage: 'Notes can be at most 200 characters',
    },
  },
};
