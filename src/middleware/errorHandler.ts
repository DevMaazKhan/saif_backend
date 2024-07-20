import { NextFunction, Request, Response } from 'express';
import logger from '../util/logger';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err;

  logger.error(error.message);
  res.status(error.statusCode || 500).json({
    success: false,
    message: 'Server error',
    data: null,
  });
};

export default errorHandler;
