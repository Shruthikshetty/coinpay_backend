// simple logger to log all the request to the api
import { logger } from './logger.mjs';

export const requestLogger = (req, _, next) => {
  logger.info(`${req.method} ${req.originalUrl} from ${req.ip}`);
  next();
};
