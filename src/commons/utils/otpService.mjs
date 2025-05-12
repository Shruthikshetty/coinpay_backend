import redisClient from '../clients/redisClient.mjs';

// genrate a random otp of 6 digits
export const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// this can be used to check if a otp for the phone number already exists
export const canResendOTP = async (phoneNumber) => {
  const key = `otp-sent:${phoneNumber}`;
  const exists = await redisClient.exists(key);
  if (exists) return false;
  await redisClient.setEx(key, 60, '1'); // allow resend only once every 60 seconds
  return true;
};

//this is to store the otp in redis
// takes the phone number and the genrated otp
export const setOTP = async (phoneNumber, otp) => {
  await redisClient.setEx(`otp:${phoneNumber}`, 60, otp); // expires in 1 mins
};

// this is used to verify the
// give the user entered otp
export const verifyOTP = async (phoneNumber, otp) => {
  const storedOtp = await redisClient.get(`otp:${phoneNumber}`);
  // check for the otp expired case
  if (!storedOtp) {
    return { success: false, reason: 'expired' };
  }
  // check for invalied otp case
  if (storedOtp !== otp) {
    return { success: false, reason: 'invalid' };
  }
  // if non return success
  return { success: true };
};

// delete the otp created for a phonenumber
export const deleteOTP = async (phoneNumber) => {
  await redisClient.del(`otp:${phoneNumber}`);
};
