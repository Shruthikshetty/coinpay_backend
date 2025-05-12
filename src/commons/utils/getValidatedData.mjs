import { validationResult, matchedData } from 'express-validator';

/**
 * Middleware to validate request using express-validator and attach matched data.
 */
export const validateRequest = (req, res, next) => {
  // get the validation result
  const result = validationResult(req);
  // check if there are any errors
  if (!result.isEmpty()) {
    // if erros send error
    return res.status(400).json({ error: result.array() });
  }
  req.validatedData = matchedData(req);
  // if no errors call next
  next();
};
