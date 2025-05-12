/** This file contains all the routes related to city */
import { Router } from 'express';
import {
  getCities,
  addCity,
  getCitiesByCountry,
} from '../controllers/city.mjs';
import { validateRequest } from '../commons/utils/getValidatedData.mjs';
import { checkSchema } from 'express-validator';
import { addCityValidatedReq } from '../commons/validation-schemas/addCity.mjs';

// Initialize route
const router = Router();

// Route to get all cities
router.get('/', getCities);

// Route to add a new city
router.post(
  '/',
  checkSchema(addCityValidatedReq), // validate using schema
  validateRequest,
  addCity
);

// Route to get cities by country ID
router.get('/country/:countryRefId', getCitiesByCountry);

export default router;
