import { Patterns } from '../constants/patters.contants.mjs';

// this is the validation schema to check request body of validate otp
export const verifyOtpValidationReq = {
  phoneNumber: {
    notEmpty: { errorMessage: 'Phone number is required' },
    isString: { errorMessage: 'Phone number should be string' },
    matches: {
      options: Patterns.phoneNumber,
      errorMessage:
        'Phone number must be a valid 10-digit Indian number | its a invalied number ',
    },
    trim: true,
  },
  otp: {
    notEmpty: { errorMessage: 'otp is required' },
    isString: { errorMessage: 'otp should be string' },
    isLength: {
      options: { min: 6, max: 6 },
      errorMessage: 'otp should be 6 in digits',
    },
    trim: true,
  },
};
