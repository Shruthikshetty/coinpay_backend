// used to validate the request body of the add customner
import { validatePan } from '../utils/validations.mjs';

// all the validations applied on the add customer request body
export const validateAddCustomerReq = {
  email: {
    notEmpty: { errorMessage: 'Email is required' },
    isEmail: true,
  },
  name: {
    notEmpty: { errorMessage: 'Name is required' },
    isLength: {
      options: { min: 1, max: 50 },
      errorMessage: 'Name must be between 1 and 50 characters',
    },
    trim: true,
  },
  address: {
    notEmpty: { errorMessage: 'Address is required' },
    isLength: {
      options: { min: 5, max: 100 },
      errorMessage: 'Address must be between 5 and 100 characters',
    },
    trim: true,
  },
  city: {
    notEmpty: { errorMessage: 'City is required' },
  },
  country: {
    notEmpty: { errorMessage: 'Country is required' },
  },
  dob: {
    notEmpty: { errorMessage: 'Date of birth is required' },
    custom: {
      options: (value) => !isNaN(Date.parse(value)),
      errorMessage: 'Invalid date format',
    },
  },
  panNumber: {
    notEmpty: { errorMessage: 'PAN number is required' },
    custom: {
      options: (value) => validatePan(value),
      errorMessage: 'Invalid PAN format',
    },
    trim: true,
  },
  phoneNumber: {
    notEmpty: { errorMessage: 'Phone number is required' },
    isLength: {
      options: { min: 10, max: 10 },
      errorMessage: 'Phone number must be exactly 10 digits',
    },
    trim: true,
  },
  pinCode: {
    notEmpty: { errorMessage: 'PIN code is required' },
    isLength: {
      options: { min: 6, max: 6 },
      errorMessage: 'PIN code must be exactly 6 digits',
    },
  },
  userName: {
    optional: true,
    isString: { errorMessage: 'Username must be a string' },
    trim: true,
  },
  profileImage: {
    optional: true,
    isString: { errorMessage: 'Profile image must be a string URL' },
  },
};
