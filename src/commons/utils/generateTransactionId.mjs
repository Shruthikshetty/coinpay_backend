import { Counter } from '../../modals/Counter.mjs';

// used to generate transaction id dynamically
export const getNextTransactionId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { key: 'transactionId' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return `TRANS${counter.value}`;
};
