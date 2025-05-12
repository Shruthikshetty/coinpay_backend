import { CARD_TYPES } from '../constants/model.constants.mjs';

export const addCardValidatedReq = {
  accountRefId: {
    notEmpty: { errorMessage: 'Account ref Id is required' },
    isMongoId: { errorMessage: 'Account ref is Invalied' },
  },
  cardType: {
    notEmpty: { errorMessage: 'Card type is required' },
    isIn: {
      options: [CARD_TYPES],
      errorMessage: `Card type must be one of: ${CARD_TYPES.join(', ')}`,
    },
  },
};
