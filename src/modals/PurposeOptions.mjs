import { Schema, model } from "mongoose";

// PurposeOptions schema for the purpose options collection in the database
const purposeOptionsSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the PurposeOptions model using the purposeOptionsSchema
export const PurposeOption = model("PurposeOption", purposeOptionsSchema);
