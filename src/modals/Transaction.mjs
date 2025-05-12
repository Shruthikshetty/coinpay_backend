import { Schema, model } from 'mongoose';
import {
  SPENDING_TYPES,
  TRANSACTION_STATUS,
} from '../commons/constants/model.constants.mjs';

// transaction schema containing all the infor for the transaction model
const TransactionSchema = new Schema(
  {
    // Relational References
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    // Transaction Parties
    name: {
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
    toAccountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    fromAccountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      default: '',
    },

    // Transaction Details
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    credit: {
      type: Boolean,
      required: true,
      // true = outgoing, false = incoming
    },
    closingBalance: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: SPENDING_TYPES,
      default: 'misc',
    },

    // Additional fields for metrics and analytics
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    notes: {
      type: String,
      maxlength: 200,
    },
    status: {
      type: String,
      enum: TRANSACTION_STATUS,
      default: 'completed',
    },
  },
  { timestamps: true }
);

// Exporting the Transaction model
export const Transaction = model('Transaction', TransactionSchema);
