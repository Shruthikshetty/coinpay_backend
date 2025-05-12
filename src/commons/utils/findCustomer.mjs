import { Customer } from '../../modals/Customer.mjs';

/**
 * Finds a customer by customerId and throws an error if not found
 * @param {string} customerRefId
 * @returns {Promise<Object>} - Customer document
 * @throws {Error} - If customer is not found
 */
export const findCustomerOrThrow = async (customerRefId) => {
  const customer = await Customer.findOne({ _id: customerRefId }).lean();
  if (!customer) {
    const error = new Error('Customer not found');
    error.statusCode = 404;
    throw error;
  }
  return customer;
};
