/** this file congtains all the routes retaled to country */
import { Router } from 'express';
import { getCountries, addCountry } from '../controllers/country.mjs';
import { validateRequest } from '../commons/utils/getValidatedData.mjs';
import { checkSchema } from 'express-validator';
import { addCountryValidatedReq } from '../commons/validation-schemas/addCountry.mjs';

//initialize route
const router = Router();

//route to get all the country
router.get('/', getCountries);
//add a new country
router.post(
  '/',
  checkSchema(addCountryValidatedReq), // validate using schema
  validateRequest,
  addCountry
);

export default router;
