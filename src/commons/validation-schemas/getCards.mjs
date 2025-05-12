// this schema is for vaidating the req body for get cards
export const getCardsValidateReq = {
  accountRefId: {
    notEmpty: { errorMessage: 'Account reference ID is required' },
    isMongoId: { errorMessage: 'Invalid account reference ID format' },
  },
};
