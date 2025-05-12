// This validates the request body for creating or updating a PurposeOption
export const purposeOptionValidatedReq = {
  key: {
    notEmpty: { errorMessage: 'Key is required' },
    isString: { errorMessage: 'Key must be a string' },
  },
  title: {
    notEmpty: { errorMessage: 'Title is required' },
    isString: { errorMessage: 'Title must be a string' },
  },
  subtitle: {
    notEmpty: { errorMessage: 'Subtitle is required' },
    isString: { errorMessage: 'Subtitle must be a string' },
  },
  image: {
    optional: true,
    isString: { errorMessage: 'Image must be a string' },
  },
};
