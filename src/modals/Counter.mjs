import { Schema, model } from 'mongoose';

// this is a counter to assign account numbers dynamically
const counterSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Number, required: true },
});

export const Counter = model('counter', counterSchema);
