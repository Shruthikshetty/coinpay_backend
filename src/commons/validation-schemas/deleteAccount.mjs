// this schema is for vaidating the req body for delete account
export const deleteCardValidateReq = {
  accountRefId: {
    notEmpty: { errorMessage: 'Account reference ID is required' },
    isMongoId: { errorMessage: 'Invalid account reference ID format' },
  },
};
