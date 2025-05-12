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
