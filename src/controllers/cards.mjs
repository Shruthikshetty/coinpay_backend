import { Card } from '../modals/Cards.mjs';
import { handle500Error } from '../commons/utils/handleError.mjs';
import { getNextCardNumber } from '../commons/utils/generateCardNumber.mjs';
import { generateCvv } from '../commons/utils/generateCvv.mjs';
import { dateAfterYears } from '../commons/utils/getDateAfterYears.mjs';
import { Account } from '../modals/Account.mjs';

// Controller to get all cards by account reference ID
export const getCardsByAccount = async (req, res) => {
  const { accountRefId } = req.validatedData;

  try {
    // get the cards from db
    const cards = await Card.find({ account: accountRefId }).lean();

    // incase no cards found
    if (!cards || cards.length === 0) {
      return res
        .status(404)
        .json({ message: 'No cards found for this account' });
    }
    // send the response
    res.status(200).json(cards);
  } catch (error) {
    handle500Error(res, error);
  }
};

// controller to add a card to the account
export const addcard = async (req, res) => {
  //extract data from validated request body
  const { accountRefId, cardType } = req.validatedData;

  try {
    // find account by the account ref id (_id)
    const account = await Account.findById({ _id: accountRefId })
      .populate('customer')
      .lean();
    // check if account is present
    if (!account || account.length === 0) {
      return res.status(404).json({ message: 'No accounts found' });
    }
    //create a new Card
    const newCard = new Card({
      account: accountRefId,
      accountHolderName: account.customer.name,
      cardNumber: await getNextCardNumber(),
      cvv: generateCvv(),
      cardType: cardType,
      expiryDate: dateAfterYears(5), // 5 years validity
      email: account.customer.email,
    });
    // save the card details
    const savedCard = await newCard.save();
    // return the saved card
    res.status(201).json(savedCard);
  } catch (error) {
    handle500Error(res, error);
  }
};

// Controller to delete a card by its reference ID
export const deleteCardById = async (req, res) => {
  const { cardRefId } = req.validatedData;

  try {
    // Attempt to delete the card
    const deletedCard = await Card.findByIdAndDelete(cardRefId);

    // If card not found
    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    // Respond with success
    res.status(200).json({ message: 'Card deleted successfully', deletedCard });
  } catch (error) {
    handle500Error(res, error);
  }
};
