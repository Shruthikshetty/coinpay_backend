/** this file congtains all the routes retaled to transactions */
import { Router } from 'express';
import {
  getTransactions,
  addTransaction,
} from '../controllers/transaction.mjs';
import { checkSchema } from 'express-validator';
import { getTransactionValidateReq } from '../commons/validation-schemas/getTransactions.mjs';
import { validateRequest } from '../commons/utils/getValidatedData.mjs';
import { addTransactionValidationReq } from '../commons/validation-schemas/addTransaction.mjs';

//initialize router
const router = Router();

//this is the route for getting all transactions for a customer
router.post(
  '/get',
  checkSchema(getTransactionValidateReq),
  validateRequest,
  getTransactions
);
// this is used to add a new transaction to the customer basically we can only send
router.post(
  '/send',
  checkSchema(addTransactionValidationReq),
  validateRequest,
  addTransaction
);

export default router;
