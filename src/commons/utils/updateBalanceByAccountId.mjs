import { Account } from '../../modals/Account.mjs';

/**
 * Updates the balance of an account by its ID and throws if account not found
 * @param {string} accountRefId - The ObjectId of the account
 * @param {number} balance - The new balance to set
 * @returns {Promise<Object>} - Returns the updated account
 * @throws {Error} - If account is not found
 */
export const updateAccountBalanceById = async (accountRefId, balance) => {
  // find and update by account id
  const updatedAccount = await Account.findByIdAndUpdate(
    accountRefId,
    { balance },
    { new: true, runValidators: true }
  );
  // if no account found
  if (!updatedAccount) {
    const error = new Error('Account not found');
    error.statusCode = 404;
    throw error;
  }

  return updatedAccount;
};
