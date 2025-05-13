// to validate the req body of update profilr image
export const updateProfileImgValidationReq = {
  customerId: {
    notEmpty: { errorMessage: 'customerId is required' },
    isString: {
      errorMessage: 'Customer id Should be string ',
    },
  },
  profileImage: {
    notEmpty: { errorMessage: 'profileImage is required' },
    isString: {
      errorMessage: 'profileImage Should be url string ',
    },
  },
};

// this is used to vlidate the req body of update customer details
export const updateCustomerValidationReq = {
  customerId: {
    notEmpty: { errorMessage: 'customerId is required' },
    isString: {
      errorMessage: 'Customer id Should be string ',
    },
  },
  name: {
    optional: true,
    isString: {
      errorMessage: 'Name Should be string ',
    },
  },
  email: {
    optional: true,
    isEmail: {
      errorMessage: 'Email Should be valid email',
    },
  },
  addres: {
    optional: true,
    isString: {
      errorMessage: 'Address Should be string ',
    },
  },
  country: {
    optional: true,
    isString: {
      errorMessage: 'Country Should be string ',
    },
  },
  city: {
    optional: true,
    isString: {
      errorMessage: 'City Should be string ',
    },
  },
  pinCode: {
    optional: true,
    isNumeric: {
      errorMessage: 'PinCode Should be number',
    },
  },
  dob: {
    optional: true,
    notEmpty: { errorMessage: 'Date of birth is required' },
    custom: {
      options: (value) => !isNaN(Date.parse(value)),
      errorMessage: 'Invalid date format',
    },
  },
};

//this is used to validate requwst body of update phone number
export const updatePhoneNumberValidationReq = {
  customerId: {
    notEmpty: { errorMessage: 'customerId is required' },
    isString: {
      errorMessage: 'Customer id Should be string ',
    },
  },
  phoneNumber: {
    notEmpty: { errorMessage: 'phoneNumber is required' },
    isString: {
      errorMessage: 'phoneNumber Should be string ',
    },
    isLength: {
      options: { min: 10, max: 10 },
      errorMessage: 'PhoneNumber must be exactly 10 digits',
    },
    trim: true,
  },
};
