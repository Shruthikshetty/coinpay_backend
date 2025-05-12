/** this file contains all the controllers for transactions*/
import { handle500Error } from '../commons/utils/handleError.mjs';
import { Transaction } from '../modals/Transaction.mjs';
import { Account } from '../modals/Account.mjs';
import { updateAccountBalanceById } from '../commons/utils/updateBalanceByAccountId.mjs';
import { getNextTransactionId } from '../commons/utils/generateTransactionId.mjs';

// get all transactions related to a user
export const getTransactions = async (req, res) => {
  // destructure from validated request body
  const {
    customerRefId,
    accountRefId,
    start = 0,
    limit = 10,
  } = req.validatedData;

  try {
    // Find transactions by customer id or account id
    const transactions = customerRefId
      ? await Transaction.find({
          customer: customerRefId,
        })
          .sort({ createdAt: -1 }) // get latest transaction first
          .skip(Number(start))
          .limit(Number(limit))
          .select('-customer -account')
      : await Transaction.find({
          account: accountRefId,
        })
          .sort({ createdAt: -1 }) // get latest transaction first
          .skip(Number(start))
          .limit(Number(limit))
          .select('-customer -account');

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'transctions not found' });
    }
    res.status(200).json(transactions);
  } catch (error) {
    handle500Error(res, error);
  }
};

// add a transaction
export const addTransaction = async (req, res) => {
  const { toAccountNumber, fromAccountNumber, amount, category, notes } =
    req.validatedData;
  try {
    // Get sender and receiver accounts
    const fromAccount = await Account.findOne({
      accountNumber: fromAccountNumber,
    })
      .populate('customer')
      .lean();
    const toAccount = await Account.findOne({ accountNumber: toAccountNumber })
      .populate('customer')
      .lean();

    // Check if both accounts exist
    if (!fromAccount || !toAccount) {
      return res
        .status(404)
        .json({ message: 'Invalid sender or receiver account' });
    }

    // check if sender has sufficient balance
    if (fromAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    //subtract from sender
    await updateAccountBalanceById(
      fromAccount._id,
      fromAccount.balance - amount
    );

    //add to receiver
    await updateAccountBalanceById(toAccount._id, toAccount.balance + amount);

    // Create transaction record for sender
    const senderTransaction = await Transaction.create({
      amount,
      category: category ?? 'misc_pay',
      notes: notes ?? '',
      credit: false,
      fromAccountNumber: fromAccount.accountNumber,
      toAccountNumber: toAccount.accountNumber,
      name: toAccount.name,
      email: toAccount.email,
      profileImage: toAccount.customer.profileImage,
      transactionId: await getNextTransactionId(),
      customer: fromAccount.customer, // this links transaction to customer
      account: fromAccount._id, // links transaction to customer
      closingBalance: fromAccount.balance - amount,
    });

    // create transaction record for receiver
    await Transaction.create({
      amount,
      category: category ?? 'misc_pay',
      notes: notes ?? '',
      credit: true,
      fromAccountNumber: fromAccount.accountNumber,
      toAccountNumber: toAccount.accountNumber,
      name: fromAccount.name,
      email: fromAccount.email,
      profileImage: fromAccount.customer.profileImage,
      transactionId: await getNextTransactionId(),
      customer: toAccount.customer, // this links transaction to customer
      account: toAccount._id, // links transaction to customer
      closingBalance: toAccount.balance + amount,
    });

    // Send success response
    res.status(201).json(senderTransaction);
  } catch (error) {
    handle500Error(res, error);
  }
};
