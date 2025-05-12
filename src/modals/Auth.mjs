import { Schema, model } from 'mongoose';

//Auth schema
const authSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    pin: {
      type: String,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'Customer',
      required: true,
      unique: true, // Ensures one-to-one relationship
    },
  },
  {
    timestamps: true,
  }
);

// Export as a model
export const Auth = model('Auth', authSchema);
