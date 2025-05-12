import { Schema, model } from 'mongoose';
import { CARD_TYPES } from '../commons/constants/model.constants.mjs';

// Card Schema containing all the card details
const cardSchema = new Schema(
  {
    accountHolderName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    cardNumber: {
      type: String,
      required: true,
      unique: true,
      minlength: 16,
      maxlength: 16,
    },
    cvv: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 4,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    cardType: {
      type: String,
      required: true,
      enum: CARD_TYPES,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
export const Card = model('Card', cardSchema);
