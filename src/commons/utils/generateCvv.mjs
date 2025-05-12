/**
 * Generates a random 3-digit CVV as a string.
 * @returns {string} - A 3-digit CVV.
 */
export const generateCvv = () => {
  return Math.floor(100 + Math.random() * 900).toString(); // ensures it's always 3 digits
};
