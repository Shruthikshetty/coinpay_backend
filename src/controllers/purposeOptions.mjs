// Purpose: This file contains the controller for the purpose options
import { PurposeOption } from "../modals/PurposeOptions.mjs";

// this function is used to get all the purpose options
export const getPurposeOptions = async (req, res) => {
  try {
    // get all the purpose options from the database
    const purposeOptions = await PurposeOption.find();
    // check if the purpose options are found or not
    if (!purposeOptions) {
      return res.status(404).json({ message: "No purpose options found" });
    }
    // return the purpose options in the response
    res.status(200).json(purposeOptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
