import logger from '../utils/logging';

// eslint-disable-next-line no-unused-vars
export default function catchErrors(err, req, res, next) {
  logger.error(err.message, err);
  return res.status(500).send(err.message);
}
