// this is the validation schema for getting the transaction by account or customer
export const getTransactionValidateReq = {
  customerRefId: {
    optional: true,
    isMongoId: { errorMessage: 'Customer ref Id is not a valid ID' },
  },
  accountRefId: {
    optional: true,
    isMongoId: { errorMessage: 'Account ref is Invalied' },
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
  _: {
    custom: {
      options: (_, { req }) => {
        if (!req.body.customerRefId && !req.body.accountRefId) {
          throw new Error('Either customerRefId or accountRefId is required');
        }
        return true;
      },
    },
  },
};
