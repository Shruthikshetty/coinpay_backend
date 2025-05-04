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

// this function is used to add a new purpose option
export const addPurposeOption = async (req, res) => {
  // check if the request body is empty or not
  if (!req.body) {
    return res.status(400).json({ message: "Request body is empty" });
  }
  try {
    // create a new purpose option using the data from the request body
    const newPurposeOption = new PurposeOption(req.body);
    // save the new purpose option to the database
    const savedPurposeOption = await newPurposeOption.save();
    // return the saved purpose option in the response
    res.status(201).json(savedPurposeOption);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//this function is used to delete a purpose option by id
export const deletePurposeOption = async (req, res) => {
  // check if id is present in the request params or not
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Id is required" });
  }
  try {
    // delete the purpose option from the database using the id from the request body
    const deletedPurposeOption = await PurposeOption.findByIdAndDelete(id);
    // check if the purpose option is found or not
    if (!deletedPurposeOption) {
      return res.status(404).json({ message: "Purpose option not found" });
    }
    // return the deleted purpose option in the response
    res.status(200).json({
      message: "Purpose option deleted successfully",
      deletedPurposeOption,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
