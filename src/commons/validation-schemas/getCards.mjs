// this schema is for validating the req body for get cards
export const getCardsValidateReq = {
  accountRefId: {
    notEmpty: { errorMessage: 'Account reference ID is required' },
    isMongoId: { errorMessage: 'Invalid account reference ID format' },
  },
};

export const getCardsByCustomerValidateReq = {
  customerRefId: {
    notEmpty: { errorMessage: 'Customer reference ID is required' },
    isMongoId: { errorMessage: 'Invalid customer reference ID format' },
  },
};
