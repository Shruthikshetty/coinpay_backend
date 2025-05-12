// Purpose: This file contains the controller for message
import { Message } from '../modals/Message.mjs';
import {
  handle500Error,
  handleCustomError,
} from '../commons/utils/handleError.mjs';
import { generateFakeReply } from '../commons/utils/fakeMessage.mjs';
import { findCustomerOrThrow } from '../commons/utils/findCustomer.mjs';

// to get all the message for the customer
export const getMessages = async (req, res) => {
  // get customer ref from validated req body
  const { customerRefId, start = 0, limit = 10 } = req.validatedData;

  try {
    //get the nmessage from the db
    // by default fetch only recent 10 messages
    const messages = await Message.find({ customer: customerRefId })
      .sort({ createdAt: -1 }) // get latest messages first
      .skip(Number(start))
      .limit(Number(limit))
      .lean();
    // in case no messages
    if (!messages || messages.length === 0) {
      return res.status(404).json({ message: 'No messages found' });
    }
    //send the found messages
    res.status(200).json(messages.reverse());
  } catch (error) {
    handle500Error(res, error);
  }
};

// Controller to add a new message
export const addMessage = async (req, res) => {
  const { customerRefId, message } = req.validatedData;

  try {
    // Check if the customer exists
    await findCustomerOrThrow(customerRefId);
    // Save the customer's or support's message
    const userMessage = await Message.create({
      customer: customerRefId,
      message,
      sender: 'customer',
    });

    // support message add
    let supportMessage = null;
    supportMessage = await Message.create({
      customer: customerRefId,
      message: generateFakeReply(),
      sender: 'support',
    });

    // Return both messages
    res.status(201).json({
      userMessage,
      supportReply: supportMessage,
    });
  } catch (error) {
    handleCustomError(res, error);
  }
};
