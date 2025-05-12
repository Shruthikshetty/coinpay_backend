import { Schema, model, Types } from 'mongoose';

// City schema
const citySchema = new Schema(
  {
    city: {
      type: String,
      required: true,
    },
    cityCode: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: Types.ObjectId,
      ref: 'Country',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Export as a model
export const City = model('City', citySchema);
