// Utility function to handle errors in async operations
// Sends a 500 status code with the error message in the response
export const handle500Error = (res, error) => {
  res.status(500).json({ message: error.message });
};

//tthis can take a error code as well else will show 500
export const handleCustomError = (res, error) => {
  res.status(error?.statusCode ?? 500).json({ message: error.message });
};
