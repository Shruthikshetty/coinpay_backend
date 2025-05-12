import { Counter } from '../../modals/Counter.mjs';

// used to generate customer id dynamically
export const getNextCustomerId = async () => {
  const counter = await Counter.findOneAndUpdate(
    { key: 'customerId' },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  return `CUST${counter.value}`;
};
