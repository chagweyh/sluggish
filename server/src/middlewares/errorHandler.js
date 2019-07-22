import logger from '../helpers/logger';

// eslint-disable-next-line no-unused-vars
export default function errorHandler(error, req, res, next) {
  logger.error(error.message, error);
  return res.status(500).send(error.message);
}
