/** this file congtains all the routes retaled to auth */
import { Router } from 'express';
import {
  addAuthforCustomer,
  updateCustomerAuth,
  validatePin,
  validatePassword,
} from '../controllers/auth.mjs';
import { checkSchema } from 'express-validator';
import { addAuthValidatedReq } from '../commons/validation-schemas/addAuth.mjs';
import { validateRequest } from '../commons/utils/getValidatedData.mjs';
import { updateAuthValidatedReq } from '../commons/validation-schemas/updateAuth.mjs';
import { validatedPinReq } from '../commons/validation-schemas/validatePin.mjs';
import { validatedPasswordReq } from '../commons/validation-schemas/validatePassword.mjs';
//initialize router
const router = Router();

//route to add a auth to a user
router.post(
  '/add',
  checkSchema(addAuthValidatedReq),
  validateRequest, // validates the req body
  addAuthforCustomer
);

//route to update the auth details
router.patch(
  '/',
  checkSchema(updateAuthValidatedReq),
  validateRequest,
  updateCustomerAuth
);

//route to validate pin
router.post(
  '/validate/pin',
  checkSchema(validatedPinReq),
  validateRequest,
  validatePin
);

//route to validate password
router.post(
  '/validate/password',
  checkSchema(validatedPasswordReq),
  validateRequest,
  validatePassword
);

export default router;
