/** this file groups all the routes together */

import { Router } from 'express';
import customerRoute from './customer.mjs';
import authRoute from './auth.mjs';
import purposeOptionsRoute from './purposeOptions.mjs';
import countryRoute from './country.mjs';
import cityRoute from './city.mjs';
import accountRoute from './account.mjs';
import cardRoute from './card.mjs';
import messageRoute from './message.mjs';
import transactionsRoute from './transactions.mjs';
import otpRoute from './otp.mjs';

// initialize a router
const router = Router();

// All the routes go here
router.use('/api/customer', customerRoute); // customers
router.use('/api/auth', authRoute); // auth
router.use('/api/purpose-options', purposeOptionsRoute); //purpose-options
router.use('/api/country', countryRoute); //country
router.use('/api/city', cityRoute); //city
router.use('/api/account', accountRoute); // account
router.use('/api/card', cardRoute); // card
router.use('/api/message', messageRoute); // message
router.use('/api/transaction', transactionsRoute); // transactions
router.use('/api/otp', otpRoute); // otp

export default router;
