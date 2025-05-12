import { Counter } from '../../modals/Counter.mjs';

/**
 * Generates a new 16-digit unique card number using a counter.
 * @returns {Promise<string>} - The new card number.
 */
export const getNextCardNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { key: 'cardNumber' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  // Format to 16 digits (e.g., 0000000000000123)
  return counter.value.toString().padStart(16, '0');
};
