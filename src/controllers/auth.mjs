// Purpose: This file contains the controller for auth
import { handleCustomError } from '../commons/utils/handleError.mjs';
import { Auth } from '../modals/Auth.mjs';
import bcrypt from 'bcrypt';
import { findCustomerOrThrow } from '../commons/utils/findCustomer.mjs';
import { validateAuthField } from '../commons/utils/validateAuthFeild.mjs';

// used to add a authorization for a user
export const addAuthforCustomer = async (req, res) => {
  const { customerRefId, password, pin } = req.validatedData;
  try {
    // hash the password
    const hashedPass = await bcrypt.hash(password, 10);
    // hash pin if present
    const hashedPin = pin ? await bcrypt.hash(pin, 10) : '';
    // check if customer exists
    await findCustomerOrThrow(customerRefId);
    // create a new auth
    const newAuth = new Auth({
      customer: customerRefId,
      password: hashedPass,
      pin: hashedPin,
    });

    // save the auth
    await newAuth.save();
    // return a token
    res.status(201).json({ message: 'Auth creds saved' });
  } catch (error) {
    handleCustomError(res, error);
  }
};

// this is used to update the password or the pin or both
export const updateCustomerAuth = async (req, res) => {
  const { customerRefId, password, pin } = req.validatedData;

  try {
    // Ensure customer exists
    const customer = await findCustomerOrThrow(customerRefId);

    // Get the existing auth record
    const existingAuth = await Auth.findOne({ customer: customer._id });

    if (!existingAuth) {
      return res
        .status(404)
        .json({ message: 'Auth record not found for customer' });
    }

    // Hash and update fields only if new values are provided
    const updatedPassword = password
      ? await bcrypt.hash(password, 10)
      : existingAuth.password;

    const updatedPin = pin ? await bcrypt.hash(pin, 10) : existingAuth.pin;

    // Update the auth record
    existingAuth.password = updatedPassword;
    existingAuth.pin = updatedPin;

    await existingAuth.save();

    res.status(200).json({ message: 'Auth credentials updated successfully' });
  } catch (error) {
    handleCustomError(res, error);
  }
};

//this is used to validate the pin
export const validatePin = async (req, res) => {
  const { customerRefId, pin } = req.validatedData;
  try {
    // validate the pin will throw error if not valied
    await validateAuthField(customerRefId, 'pin', pin);
    res
      .status(200)
      .json({ message: 'Authorized successfully', token: 'AUTHORIZED' });
  } catch (error) {
    handleCustomError(res, error);
  }
};

// this is used to validate the password
export const validatePassword = async (req, res) => {
  const { customerRefId, password } = req.validatedData;
  try {
    // validate the password will throw error if not valied
    await validateAuthField(customerRefId, 'password', password);
    res
      .status(200)
      .json({ message: 'Authorized successfully', token: 'AUTHORIZED' });
  } catch (error) {
    handleCustomError(res, error);
  }
};
