/** This file contains all the routes related to message*/
import { Router } from 'express';
import { getMessages, addMessage } from '../controllers/message.mjs';
import { validateRequest } from '../commons/utils/getValidatedData.mjs';
import { checkSchema } from 'express-validator';
import { getMessageValidationReq } from '../commons/validation-schemas/getMessage.mjs';
import { addMessageValidationReq } from '../commons/validation-schemas/addMessage.mjs';
// Initialize route
const router = Router();

// Route to get all messages
router.post(
  '/get',
  checkSchema(getMessageValidationReq),
  validateRequest,
  getMessages
);

// route to send new message
router.post(
  '/add',
  checkSchema(addMessageValidationReq),
  validateRequest,
  addMessage
);

export default router;
