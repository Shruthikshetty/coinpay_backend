import { Counter } from '../../modals/Counter.mjs';

export const getNextAccountNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { key: 'accountNumber' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  // Format to 14 digits (e.g., 00000000001234)
  return counter.value.toString().padStart(14, '0');
};
