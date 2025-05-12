import { Schema, model } from 'mongoose';
import { Patterns } from '../commons/constants/patters.contants.mjs';
import { validatePan } from '../commons/utils/validations.mjs';

// this is the customer schema containing all the customer details
const customerSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: Patterns.email,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 100,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      require: true,
    },
    panNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      validate: {
        validator: validatePan,
        message: 'PAN number must be 6 characters long',
      },
      trim: true,
    },
    phoneNumber: {
      type: String,
      require: true,
      maxlength: 10,
      trim: true,
    },
    pinCode: {
      type: String,
      maxlength: 6,
      required: true,
    },
    profileImage: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// export as a model
export const Customer = model('Customer', customerSchema);
