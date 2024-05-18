import logger from "../services/logger.js";

export function errorHandler(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send({ message: 'Something went wrong!' });
}
