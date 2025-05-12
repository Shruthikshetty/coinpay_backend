/** this file congtains all the routes retaled to accounts */
import { Router } from 'express';
import {
  getAccounts,
  addAccount,
  updateAccountBalance,
  deleteAccount,
} from '../controllers/account.mjs';
import { checkSchema } from 'express-validator';
import { validateRequest } from '../commons/utils/getValidatedData.mjs';
import { getAccountsValidateReq } from '../commons/validation-schemas/getAccounts.mjs';
import { addAccountValidatedReq } from '../commons/validation-schemas/addAccount.mjs';
import { updateAccountBalanceValidateReq } from '../commons/validation-schemas/updateAccountBalance.mjs';
import { deleteCardValidateReq } from '../commons/validation-schemas/deleteAccount.mjs';

//initialize customer
const router = Router();

//route to get all the accounts
router.post(
  '/',
  checkSchema(getAccountsValidateReq),
  validateRequest,
  getAccounts
);
//route to add account to the customer
router.post(
  '/add',
  checkSchema(addAccountValidatedReq),
  validateRequest,
  addAccount
);
//route to update balance
router.patch(
  '/balance',
  checkSchema(updateAccountBalanceValidateReq),
  validateRequest,
  updateAccountBalance
);
// delete a account
router.post(
  '/delete',
  checkSchema(deleteCardValidateReq),
  validateRequest,
  deleteAccount
);

export default router;
