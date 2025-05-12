import { Auth } from '../../modals/Auth.mjs';
import bcrypt from 'bcrypt';

// this used to validate pin or password based on the feild name
export const validateAuthField = async (
  customerRefId,
  fieldName,
  plainValue
) => {
  // Find the auth record
  const existingAuth = await Auth.findOne({ customer: customerRefId });
  if (!existingAuth) {
    throw {
      statusCode: 404,
      message: 'Auth record not found or invalid customer ref Id',
    };
  }
  // get hased value from the Auth db
  const hashedValue = existingAuth[fieldName];
  if (!hashedValue) {
    throw { statusCode: 404, message: `No ${fieldName} set for this customer` };
  }
  // check if it maches what the user has provided
  const isMatch = await bcrypt.compare(plainValue, hashedValue);
  if (!isMatch) {
    throw { statusCode: 401, message: 'Invalid credentials' };
  }
  // if validated return true
  return true;
};
