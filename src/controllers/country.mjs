// Purpose: This file contains the controller for countries
import { handle500Error } from '../commons/utils/handleError.mjs';
import { Country } from '../modals/Country.mjs';

// this is used to get the list of countries
export const getCountries = async (_, res) => {
  try {
    // get countries from db
    const countries = await Country.find();
    if (!countries) {
      return res.status(404).json({ message: 'countries not found' });
    }
    // retrun the countries list
    res.status(200).json(countries);
  } catch (error) {
    handle500Error(res, error);
  }
};

// this is used to add a new country
export const addCountry = async (req, res) => {
  try {
    // create a new country using the data from the validated request body
    const newCountry = new Country(req.validatedData);
    // save the new country to the database
    const savedCountry = await newCountry.save();
    // return the saved customer in the response
    res.status(201).json(savedCountry);
  } catch (error) {
    handle500Error(res, error);
  }
};
