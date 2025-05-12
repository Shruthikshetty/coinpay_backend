import { Schema, model } from 'mongoose';

//country schema
const countrySchema = new Schema(
  {
    country: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    phoneCode: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export as a model
export const Country = model('Country', countrySchema);
