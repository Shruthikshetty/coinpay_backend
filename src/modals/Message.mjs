import { Schema, model } from 'mongoose';
import { MESSAGE_SENDERS } from '../commons/constants/model.constants.mjs';

const messageSchema = new Schema({
  sender: {
    type: String,
    enum: MESSAGE_SENDERS,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 30, // 6expires after 30 days
  },
});

export const Message = model('Message', messageSchema);
