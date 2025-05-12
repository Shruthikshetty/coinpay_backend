// this schema is for vaidating the req body for get cards
export const deleteCardValidationReq = {
  cardRefId: {
    notEmpty: { errorMessage: 'Card reference ID is required' },
    isMongoId: { errorMessage: 'Card ref ID format is invalied' },
  },
};
