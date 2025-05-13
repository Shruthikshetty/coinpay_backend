/** this file congtains all the routes retaled to customer */
import { Router } from 'express';
import {
  addCustomer,
  getCustomers,
  getCustomerById,
  updateCustomerProfileImage,
  updateCustomerDetails,
} from '../controllers/customer.mjs';
import { checkSchema } from 'express-validator';
import { validateAddCustomerReq } from '../commons/validation-schemas/validateAddCustomer.mjs';
import { validateRequest } from '../commons/utils/getValidatedData.mjs';
import {
  updateProfileImgValidationReq,
  updateCustomerValidationReq,
} from '../commons/validation-schemas/updateCustomer.mjs';

//initialize customer
const router = Router();

//route to add customer
router.post(
  '/',
  checkSchema(validateAddCustomerReq),
  validateRequest,
  addCustomer // controller has clean logic now
);
//route to get all the customers
router.get('/', getCustomers);
//route to get customer by customer id
router.get('/:customerId', getCustomerById);
// route to update profile image
router.put(
  '/profileimage',
  checkSchema(updateProfileImgValidationReq),
  validateRequest,
  updateCustomerProfileImage
);
// route to update customer details
router.patch(
  '/details',
  checkSchema(updateCustomerValidationReq),
  validateRequest,
  updateCustomerDetails
);

export default router;
