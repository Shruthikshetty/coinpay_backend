import { Router } from 'express';
import { sendOtp, confirmOtp } from '../controllers/otp.mjs';
import { validateRequest } from '../commons/utils/getValidatedData.mjs';
import { checkSchema } from 'express-validator';
import { sendOtpValidationReq } from '../commons/validation-schemas/sendOtp.mjs';
import { verifyOtpValidationReq } from '../commons/validation-schemas/confirmOtp.mjs';

// Initialize route
const router = Router();

//this route is used to generate a otp and send to customer
router.post(
  '/send',
  checkSchema(sendOtpValidationReq),
  validateRequest,
  sendOtp
);
//this route is used to  validated otp
router.post(
  '/verify',
  checkSchema(verifyOtpValidationReq),
  validateRequest,
  confirmOtp
);

// export router as default
export default router;
