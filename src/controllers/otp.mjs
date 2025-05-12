import {
  generateOTP,
  setOTP,
  canResendOTP,
  verifyOTP,
} from '../commons/utils/otpService.mjs';
import { handle500Error } from '../commons/utils/handleError.mjs';

// this is used to generate and send a otp to user phonenumber
// NOTE we only simulate it sending but no otp is sent to user rather we jsut return it in the response
export const sendOtp = async (req, res) => {
  try {
    // get phone nmbber from validated request body
    const { phoneNumber } = req.validatedData;

    // check if a otp already exist
    if (!(await canResendOTP(phoneNumber))) {
      return res.status(429).json({
        message:
          'Please wait before resending OTP. Your otp will remain active for 60s',
      });
    }
    // generate a random otp
    const otp = generateOTP();

    // store the otp in redis
    await setOTP(phoneNumber, otp);
    // retrun the otp
    // NOTE : (since we are not sending any otp to phone)
    res.status(200).json({ message: 'OTP sent', otp });
  } catch (error) {
    // catch any in case anything fails
    handle500Error(res, error);
  }
};

// this is used to confirm if the otp entered by the user is correct
export const confirmOtp = async (req, res) => {
  const { phoneNumber, otp } = req.validatedData;
  try {
    const result = await verifyOTP(phoneNumber, otp);
    if (!result?.success) {
      // if validation failed
      return res.status(400).json({
        message: result.reason === 'expired' ? 'OTP expired' : 'Invalid OTP',
        success: false,
      });
    }
    // retrun the success
    res
      .status(200)
      .json({ message: 'OTP verified successfully', success: true });
  } catch (error) {
    handle500Error(res, error);
  }
};
