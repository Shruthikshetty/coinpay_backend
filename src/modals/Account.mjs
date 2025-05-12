import { Schema, model } from 'mongoose';
import { ACCOUNT_TYPES } from '../commons/constants/model.constants.mjs';
import { Patterns } from '../commons/constants/patters.contants.mjs';
import { Card } from '../modals/Cards.mjs';

// Account Schema
const accountSchema = new Schema(
  {
    accountNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxlength: 14,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    accountType: {
      type: String,
      required: true,
      enum: ACCOUNT_TYPES,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer', // References the Customer model
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: Patterns.email,
      lowercase: true,
      trim: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// delete all cards if account is deleetd
accountSchema.pre('findOneAndDelete', async function (next) {
  const account = await this.model.findOne(this.getFilter());
  if (account) {
    await Card.deleteMany({ account: account._id });
  }
  next();
});

// Export as a model
export const Account = model('Account', accountSchema);
