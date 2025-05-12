// Purpose: This file contains the controller for cities
import { handle500Error } from '../commons/utils/handleError.mjs';
import { City } from '../modals/City.mjs';
import { Country } from '../modals/Country.mjs';

// Get all cities
export const getCities = async (_, res) => {
  try {
    // get the data from db
    const cities = await City.find().lean().select('-country');
    // in case no data found
    if (!cities) {
      return res.status(404).json({ message: 'Cities not found' });
    }
    // send the fetched data
    res.status(200).json(cities);
  } catch (error) {
    handle500Error(res, error);
  }
};

// Add a new city
export const addCity = async (req, res) => {
  const { city, cityCode, countryRefId } = req.validatedData;
  try {
    // Check if the country exists
    const country = await Country.findById(countryRefId);
    if (!country) {
      return res.status(404).json({ message: 'Country not found' });
    }
    // create a new City from the request body
    const newCity = new City({
      city,
      cityCode,
      country: countryRefId,
    });
    // save the new city
    const savedCity = await newCity.save();
    // send the saved city
    res.status(201).json(savedCity);
  } catch (error) {
    handle500Error(res, error);
  }
};

// Get cities by countryRef
export const getCitiesByCountry = async (req, res) => {
  const { countryRefId } = req.params;
  if (!countryRefId) {
    res.status(404).json({ message: 'country ref id is required' });
  }
  try {
    // get all city data that are in a country
    const cities = await City.find({ country: countryRefId })
      .lean()
      .select('-country'); // exclude country ref
    // incase no ceties found
    if (!cities || cities.length === 0) {
      return res
        .status(404)
        .json({ message: 'No cities found for this country' });
    }
    // send the found cities
    res.status(200).json(cities);
  } catch (error) {
    handle500Error(res, error);
  }
};
