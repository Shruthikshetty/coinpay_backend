import { Patterns } from '../constants/patters.contants.mjs';

// this is the validation schema for validation the request body of send otp
export const sendOtpValidationReq = {
  phoneNumber: {
    notEmpty: { errorMessage: 'Phone number is required' },
    isString: { errorMessage: 'Phone number should be string' },
    matches: {
      options: Patterns.phoneNumber,
      errorMessage:
        'Phone number must be a valid 10-digit Indian number | its a invalied number ',
    },
  },
};
