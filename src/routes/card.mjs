/** this file congtains all the routes retaled to cards */
import { Router } from 'express';
import {
  getCardsByAccount,
  addcard,
  deleteCardById,
} from '../controllers/cards.mjs';
import { checkSchema } from 'express-validator';
import { validateRequest } from '../commons/utils/getValidatedData.mjs';
import { getCardsValidateReq } from '../commons/validation-schemas/getCards.mjs';
import { addCardValidatedReq } from '../commons/validation-schemas/addCard.mjs';
import { deleteCardValidationReq } from '../commons/validation-schemas/deleteCards.mjs';
//initialize router
const router = Router();

//route to get all the cards belonging to a account
router.post(
  '/',
  checkSchema(getCardsValidateReq),
  validateRequest,
  getCardsByAccount
);
//route add a new card for a account
router.post('/add', checkSchema(addCardValidatedReq), validateRequest, addcard);
//route to delete by card ref id (_id)
router.delete(
  '/',
  checkSchema(deleteCardValidationReq),
  validateRequest,
  deleteCardById
);

export default router;
