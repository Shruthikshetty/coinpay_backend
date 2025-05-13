// Purpose: This file contains the controller for customer
import { Customer } from '../modals/Customer.mjs';
import { handle500Error } from '../commons/utils/handleError.mjs';
import { getNextCustomerId } from '../commons/utils/generateCustomerId.mjs';

// this function is used to add a new customer
export const addCustomer = async (req, res) => {
  try {
    // create a new customer using the data from the validated request body
    const newCustomer = new Customer({
      ...req.validatedData,
      customerId: await getNextCustomerId(),
    });
    // save the new customer to the database
    const savedCustomer = await newCustomer.save();
    // return the saved customer in the response
    res.status(201).json(savedCustomer);
  } catch (error) {
    handle500Error(res, error);
  }
};

//this is a function to get all the customers
export const getCustomers = async (_, res) => {
  try {
    // get customers from the data base
    const customers = await Customer.find().lean(); // since its only goin to be read
    if (!customers) {
      return res.status(404).json({ message: 'customers not found' });
    }
    // send all the customers data
    res.status(200).json(customers);
  } catch (error) {
    handle500Error(res, error);
  }
};

// this is a function to get a customer by customerId
export const getCustomerById = async (req, res) => {
  try {
    const { customerId } = req.params;
    // find customer by customerId
    const customer = await Customer.findOne({ customerId }).lean();
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    // send the customer data
    res.status(200).json(customer);
  } catch (error) {
    handle500Error(res, error);
  }
};

// this is used to update customer profile image
export const updateCustomerProfileImage = async (req, res) => {
  const { customerId, profileImage } = req.validatedData;
  try {
    // update customer
    const updatedCustomer = await Customer.findOneAndUpdate(
      { customerId },
      { profileImage },
      { new: true }
    );
    // incase no customer founnd
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    //
    res.status(200).json({ message: 'Profile image updated' });
  } catch (error) {
    handle500Error(res, error);
  }
};

//this endpoint is used to update customer profile partially
export const updateCustomerDetails = async (req, res) => {
  const { customerId, name, email, addres, country, city, pinCode, dob } =
    req.validatedData;
  try {
    // get customerId from the request body
    // find customer by customerId
    const customer = await Customer.findOne({ customerId });
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    // update customer
    const updatedCustomer = await Customer.findOneAndUpdate(
      { customerId },
      {
        name: name ?? customer.name,
        email: email ?? customer.email,
        addres: addres ?? customer.addres,
        country: country ?? customer.country,
        city: city ?? customer.city,
        pinCode: pinCode ?? customer.pinCode,
        dob: dob ?? customer.dob,
      },
      { new: true }
    );
    // send the updated customer data
    res.status(200).json(updatedCustomer);
  } catch (error) {
    handle500Error(res, error);
  }
};
