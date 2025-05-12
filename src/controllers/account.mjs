// Purpose: This file contains the controller for the accounts
import { Account } from '../modals/Account.mjs';
import { getNextAccountNumber } from '../commons/utils/generateAccountNumber.mjs';
import {
  handle500Error,
  handleCustomError,
} from '../commons/utils/handleError.mjs';
import { findCustomerOrThrow } from '../commons/utils/findCustomer.mjs';
import { updateAccountBalanceById } from '../commons/utils/updateBalanceByAccountId.mjs';

//this is used to get all the acounts related to a customer
export const getAccounts = async (req, res) => {
  const { customerRefId } = req.validatedData;
  try {
    // find account by the customer ref id (_id)
    const accounts = await Account.find({ customer: customerRefId }).lean();

    // Check if accounts are found
    if (!accounts || accounts.length === 0) {
      return res
        .status(404)
        .json({ message: 'No accounts found for this customer' });
    }

    // Return the found accounts
    res.status(200).json(accounts);
  } catch (error) {
    handle500Error(res, error);
  }
};

// Controller to add a new account
export const addAccount = async (req, res) => {
  // Extract data from the validated request body
  const { accountType, customerRefId, balance, primary } = req.validatedData;
  try {
    // Check if the customer exists
    const customer = await findCustomerOrThrow(customerRefId);
    // Create a new account
    const newAccount = new Account({
      accountNumber: await getNextAccountNumber(),
      name: customer.name,
      balance: balance ?? 0, // default is 0 balance
      accountType: accountType,
      customer: customerRefId,
      email: customer.email,
      primary: primary ?? false, // default is false
    });

    // Save the new account to the database
    const savedAccount = await newAccount.save();

    // Return the saved account in the response
    res.status(201).json(savedAccount);
  } catch (error) {
    // Handle any errors
    handleCustomError(res, error);
  }
};

// Controller to update the balance of an account
export const updateAccountBalance = async (req, res) => {
  const { accountRefId, balance } = req.validatedData;

  try {
    // Return the updated account or throw error
    res.status(200).json(await updateAccountBalanceById(accountRefId, balance));
  } catch (error) {
    handleCustomError(res, error);
  }
};

// Controller to delete an account by _id
export const deleteAccount = async (req, res) => {
  const { accountRefId } = req.validatedData;

  try {
    // Find and delete the account
    const deletedAccount = await Account.findOneAndDelete({
      _id: accountRefId,
    });

    // If account not found
    if (!deletedAccount) {
      return res.status(404).json({ message: 'Account not found' });
    }

    // Send success response
    res
      .status(200)
      .json({ message: 'Account and associated cards deleted successfully' });
  } catch (error) {
    handleCustomError(res, error);
  }
};
